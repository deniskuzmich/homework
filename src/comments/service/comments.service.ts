import {ResultStatus} from "../../common/types/result.status";
import {ResultType} from "../../common/types/result.type";
import {UserInfoType} from "../../users/types/output-types/user-info.type";
import {PostsRepository} from "../../posts/repository/posts-repository";
import {CommentsRepository} from "../repository/comments.repository";
import {inject, injectable} from "inversify";
import {CommentDocument, CommentModel} from "../../entity/comments.entity";
import {UsersRepository} from "../../users/repository/usersRepository";
import {LikeStatus} from "../enum/like-enum";
import {LikeModel} from "../../entity/likes.entity";

@injectable()
export class CommentsService {

  constructor(
    @inject(CommentsRepository)
    public commentsRepository: CommentsRepository,
    @inject(PostsRepository)
    public postsRepository: PostsRepository,
    @inject(UsersRepository)
    public usersRepository: UsersRepository,
    ) {}

  async createCommentForPost(user: UserInfoType, content: string, postId: string): Promise<ResultType<CommentDocument | null>> {
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

    const newCommentForPost = new CommentModel({
      postId,
      content,
      commentatorInfo: {
        userId: user.userId.toString(),
        userLogin: user.login,
      },
      createdAt: new Date().toISOString(),
      likesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: 'None'
      }
    })

    const createdComment = await this.commentsRepository.save(newCommentForPost)

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

  async updateComment(id: string, newContent: string, userId: string): Promise<ResultType> {
    const comment = await this.commentsRepository.getCommentById(id);
    if (!comment) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: 'Comment not found',
        extensions: [],
        data: null
      }
    }

    if (comment.commentatorInfo?.userId?.toString() !== userId) {
      return {
        status: ResultStatus.Forbidden,
        errorMessage: 'User is not own this comment',
        extensions: [],
        data: null
      }
    }

    comment.content = newContent;

    const updatedComment = await this.commentsRepository.save(comment);
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

  async deleteComment(commentId: string, userId: string): Promise<ResultType> {
    const comment = await this.commentsRepository.getCommentById(commentId);
    if (!comment) {
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

  async updateLikeForComment(
    commentId: string,
    userId: string,
    likeStatus: LikeStatus
  ): Promise<ResultType> {

    const comment = await CommentModel.findById(commentId)
    if (!comment) {
      return {
        status: ResultStatus.NotFound,
        data: null,
        extensions: [],
        errorMessage: 'Comment not found'
      }
    }

    const existingLike = await LikeModel.findOne({userId, commentId})

    // 1. Если статус тот же — НИЧЕГО НЕ ДЕЛАЕМ
    if (existingLike && existingLike.status === likeStatus) {
      return {
        status: ResultStatus.NoContent,
        data: null,
        extensions: []
      }
    }

    // 2. Если лайка не было
    if (!existingLike) {
      await LikeModel.create({userId, commentId, status: likeStatus})

      if (likeStatus === LikeStatus.Like) {
        comment.likesInfo.likesCount += 1
      }

      if (likeStatus === LikeStatus.Dislike) {
        comment.likesInfo.dislikesCount += 1
      }

      await comment.save()

      return {
        status: ResultStatus.NoContent,
        data: null,
        extensions: []
      }
    }

    // 3. Если лайк был — МЕНЯЕМ СТАТУС
    if (existingLike.status === LikeStatus.Like) {
      comment.likesInfo.likesCount -= 1
    }

    if (existingLike.status === LikeStatus.Dislike) {
      comment.likesInfo.dislikesCount -= 1
    }

    if (likeStatus === LikeStatus.Like) {
      comment.likesInfo.likesCount += 1
    }

    if (likeStatus === LikeStatus.Dislike) {
      comment.likesInfo.dislikesCount += 1
    }

    existingLike.status = likeStatus
    await existingLike.save()
    await comment.save()

    return {
      status: ResultStatus.NoContent,
      data: null,
      extensions: []
    }
  }
}


// async updateLikeForComment(commentId: string, likeStatus: LikeStatus): Promise<ResultType> {
//   const comment = await this.commentsRepository.getCommentById(commentId);
//   if(!comment) {
//   return {
//     status: ResultStatus.NotFound,
//     errorMessage: 'Comment not found',
//     extensions: [],
//     data: null
//   }
// }
//
// if(!Object.values(LikeStatus).includes(likeStatus)) {
//   return {
//     status: ResultStatus.BadRequest,
//     extensions: [],
//     data: null
//   }
// }
// comment.likesInfo.myStatus = likeStatus
//
// await this.commentsRepository.save(comment);
//
// return {
//   status: ResultStatus.NoContent,
//   extensions: [{field: 'likeStatus', message: 'Bad Request from likeStatus'}],
//   data: null
// }
// }