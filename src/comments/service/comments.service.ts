import {ResultStatus} from "../../common/types/result.status";
import {ResultType} from "../../common/types/result.type";
import {UserInfoType} from "../../users/types/output-types/user-info.type";
import {WithId} from "mongodb";
import {CommentDbType} from "../types/main-types/comment-db.type";
import {CommentsQueryRepository} from "../repository/comments-query.repository";
import {PostsRepository} from "../../posts/repository/posts-repository";
import {CommentsRepository} from "../repository/comments.repository";


export class CommentsService {
  commentsQueryRepository: CommentsQueryRepository;
  commentsRepository: CommentsRepository;
  postsRepository: PostsRepository;

  constructor(commentsQueryRepository: CommentsQueryRepository, commentsRepository: CommentsRepository, postsRepository: PostsRepository) {
    this.commentsQueryRepository = commentsQueryRepository;
    this.commentsRepository = commentsRepository;
    this.postsRepository = postsRepository;
  }
  async updateComment(id: string, newContent: string, userId: string ): Promise<ResultType> {
    const comment = await this.commentsQueryRepository.getCommentById(id);
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
    const updatedComment = await this.commentsRepository.updateComment(id, newContent);
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
  }

  async createCommentForPost(user: UserInfoType, content: string, postId: string): Promise<ResultType<WithId<CommentDbType> | null>> {
    const isPostExists = await this.postsRepository.getPostById(postId);
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

    const newCommentForPost = {
      postId,
      content,
      commentatorInfo: {
        userId: user.userId.toString(),
        userLogin: user.login,
      },
      createdAt: new Date().toISOString(),
    }
    const createdComment = await this.commentsRepository.createCommentForPost(newCommentForPost)

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
  }

  async deleteComment(commentId: string, userId: string): Promise<ResultType> {
    const comment = await this.commentsRepository.getCommentById(commentId);
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

    await this.commentsRepository.deleteComment(commentId);
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: null
    }
  }
}

