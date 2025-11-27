import {commentsQueryRepository} from "../repository/comments-query.repository";
import {CommentOutput} from "../types/main-types/comment-output.type";
import {ResultStatus} from "../../common/types/result.status";
import {ResultType} from "../../common/types/result.type";
import {commentsRepository} from "../repository/comments.repository";
import {UserInfoType} from "../../users/types/output-types/user-info.type";
import {postsQueryRepository} from "../../posts/repository/posts-query-repository";
import {valuesPaginationMaper} from "../../blogs/mapper/post-for-blog-mapper";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {QueryInputForPagination} from "../../common/types/input/query-input-for-pagination";


export const commentsService = {
  async getCommentById(id: string): Promise<ResultType<CommentOutput | null>> {
    const comment = await commentsQueryRepository.getCommentById(id);
    if (!comment) {
      return {
        status: ResultStatus.NotFound,
        extensions: [],
        data: null
      }
    }
    return {
      status: ResultStatus.Success,
      extensions: [],
      data: comment
    }
  },

  async getCommentByPostId(id:string, query: QueryInputForPagination): Promise<ResultType<OutputTypeWithPagination<CommentOutput> | null>> {
    const post = await postsQueryRepository.getPostById(id)
    if(!post) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: 'Post not found',
        extensions: [],
        data: null
      }
    }
    const values = valuesPaginationMaper(query);
    const commentForPost = await commentsQueryRepository.getCommentByPostId(id, values)
    return {
      status: ResultStatus.Success,
      extensions: [],
      data: commentForPost
    }
  },

  async updateComment(id: string, newContent: string): Promise<ResultType<null>> {
    const comment = await commentsQueryRepository.getCommentById(id);
    if (!comment) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: 'Comment not found',
        extensions: [],
        data: null
      }
    }
    const updatedComment = await commentsRepository.updateComment(id, newContent);
    if(!updatedComment) {
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

  async createCommentForPost(user: UserInfoType, content: string, postId: string): Promise<ResultType<CommentOutput | null>>  {
    const isPostExists = await postsQueryRepository.getPostById(postId);
    if(!isPostExists) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: 'Post not found',
        extensions: [],
        data: null
      }
    }

    if(!user.userId) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: 'UserId not found' ,
        extensions: [{field: 'comment', message: 'UserId not found'}],
        data: null
      }
    }

    const newCommentForPost = {
      postId,
      content,
      commentatorInfo: {
        userId: user.userId.toString(),
        userLogin: user.login,
      },
      createdAt: new Date().toISOString()
    }
    const createdComment = await commentsRepository.createCommentForPost(newCommentForPost)
    console.log('Result from Repository:', createdComment);
    if(!createdComment) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: 'Bad request to create comment' ,
        extensions: [{field: 'comment', message: 'Bad request to create comment'}],
        data: null
      }
    }
    return {
      status: ResultStatus.Success,
      extensions: [],
      data: createdComment
    }
  },

  async deleteComment(id: string): Promise<ResultType<null>> {
   const deletedComment = await commentsRepository.deleteComment(id);
   if(!deletedComment) {
     return {
       status: ResultStatus.NotFound,
       errorMessage: 'Comment not found',
       extensions: [],
       data: null
     }
   }
   return {
     status: ResultStatus.NoContent,
     extensions: [],
     data: null
   }
  }
}