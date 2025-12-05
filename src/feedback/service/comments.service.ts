import {commentsQueryRepository} from "../repository/comments-query.repository";
import {CommentOutput} from "../types/main-types/comment-output.type";
import {ResultStatus} from "../../common/types/result.status";
import {ResultType} from "../../common/types/result.type";
import {commentsRepository} from "../repository/comments.repository";
import {UserInfoType} from "../../users/types/output-types/user-info.type";
import {postsRepository} from "../../posts/repository/posts-repository";
import {CommentForPostInput} from "../types/main-types/comment-for-post-input.type";
import {WithId} from "mongodb";
import {CommentDbType} from "../types/main-types/comment-db.type";
import {QueryInputForPagination} from "../../common/types/input/query-input-for-pagination";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {postsQueryRepository} from "../../posts/repository/posts-query-repository";
import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";


export const commentsService = {
  // async getCommentById(id: string): Promise<ResultType<CommentOutput | null>> {
  //   if (!id) {
  //     return {
  //       status: ResultStatus.NotFound,
  //       extensions: [],
  //       data: null
  //     }
  //   }
  //   const comment = await commentsQueryRepository.getCommentById(id);
  //   if (!comment) {
  //     return {
  //       status: ResultStatus.NotFound,
  //       extensions: [],
  //       data: null
  //     }
  //   }
  //   return {
  //     status: ResultStatus.Success,
  //     extensions: [],
  //     data: comment
  //   }
  // },

  // async getCommentByPostId(postId: string): Promise<ResultType<WithId<CommentDbType> | null>> {
  //   const post = await postsRepository.getPostById(postId)
  //   if (!post) {
  //     return {
  //       status: ResultStatus.NotFound,
  //       errorMessage: 'Post not found',
  //       extensions: [],
  //       data: null
  //     }
  //   }
  //   const commentForPost = await commentsRepository.getCommentByPostId(postId)
  //   return {
  //     status: ResultStatus.Success,
  //     extensions: [],
  //     data: commentForPost
  //   }
  // },

  async updateComment(id: string, newContent: string, userId: string ): Promise<ResultType> {
    const comment = await commentsQueryRepository.getCommentById(id);
    if (!comment) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: 'Comment not found',
        extensions: [],
        data: null
      }
    }

    if(comment.commentatorInfo?.userId?.toString() !== userId) {
      return {
        status: ResultStatus.Forbidden,
        errorMessage: 'User is not own this comment',
        extensions: [],
        data: null
      }
    }
    const updatedComment = await commentsRepository.updateComment(id, newContent);
    if (!updatedComment) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: 'Bad request',
        extensions: [{field: 'content', message: 'Bad request to update comment'}],
        data: null
      }
    }
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: null
    }
  },

  async createCommentForPost(user: UserInfoType, content: string, postId: string): Promise<ResultType<CommentForPostInput | null>> {
    const isPostExists = await postsRepository.getPostById(postId);
    if (!isPostExists) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: 'Post not found',
        extensions: [],
        data: null
      }
    }

    if (!user.userId) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: 'UserId not found',
        extensions: [{field: 'comment', message: 'UserId not found'}],
        data: null
      }
    }
    const timestamp = new Date().toISOString();
    const newCommentForPost = {
      postId,
      content,
      commentatorInfo: {
        userId: user.userId.toString(),
        userLogin: user.login,
      },
      createdAt: timestamp
    }
    const createdComment = await commentsRepository.createCommentForPost(newCommentForPost)

    if (!createdComment) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: 'Bad request to create comment',
        extensions: [{field: 'comment', message: 'Bad request to create comment'}],
        data: null
      }
    }
    return {
      status: ResultStatus.Created,
      extensions: [],
      data: createdComment
    }
  },

  async deleteComment(commentId: string, userId: string): Promise<ResultType> {
    const comment = await commentsRepository.getCommentById(commentId);
    if(!comment) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: 'Comment not found',
        extensions: [],
        data: null
      }
    }
    if (comment.commentatorInfo.userId.toString() !== userId) {
      return {
        status: ResultStatus.Forbidden,
        errorMessage: 'User is not own this comment',
        extensions: [],
        data: null
      }
    }

    const deletedComment = await commentsRepository.deleteComment(commentId);
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: null
    }
  }
}