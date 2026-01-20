import {mapToCommentViewModel} from "../mapper/map-to-comment-view-model";
import {CommentOutput} from "../types/main-types/comment-output.type";
import {finalCommentMapper} from "../mapper/final-comment-mapper";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {InputPaginationForRepo} from "../../common/types/input/input-pagination-for-repo.type";
import {injectable} from "inversify";
import {CommentModel} from "../../entity/comments.entity";
import {LikeStatus} from "../enum/like-enum";
import {LikeModel} from "../../entity/likes.entity";


export type CommentWithLikesOutput = {
  id: string
  content: string
  commentatorInfo: {
    userId: string
    userLogin: string
  }
  createdAt: Date
  likesInfo: {
    likesCount: number
    dislikesCount: number
    myStatus: LikeStatus
  }
}

@injectable()
export class CommentsQueryRepository {
  async getCommentWithLike(
    commentId: string,
    userId: string | null
  ): Promise<CommentWithLikesOutput | null> {
    const comment = await CommentModel.findById(commentId);
    if (!comment) return null;

    let myStatus = LikeStatus.None;

    if (userId) {
      const like = await LikeModel.findOne({ userId, commentId });
      if (like) myStatus = like.status;
    }

    return {
      id: comment._id.toString(),
      content: comment.content,
      commentatorInfo: comment.commentatorInfo,
      createdAt: comment.createdAt,
      likesInfo: {
        likesCount: comment.likesInfo.likesCount,
        dislikesCount: comment.likesInfo.dislikesCount,
        myStatus
      }
    }
  }
  async getCommentById(commentId: string): Promise<CommentOutput | null> {
    const comment = await CommentModel.findOne({_id: commentId})
    if (!comment) return null;

    return mapToCommentViewModel(comment)
  }

  async getCommentByPostIdWithPagination(postId: string, query: InputPaginationForRepo, userId: string | null): Promise<OutputTypeWithPagination<CommentWithLikesOutput>> {
    const skip = (query.pageSize * query.pageNumber) - query.pageSize;

    const sort = {[query.sortBy]: query.sortDirection}

    const comments = await CommentModel
      .find({postId: postId})
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort)


    const totalCount = await CommentModel.countDocuments({postId: postId});

    const commentIds = comments.map(c => c._id.toString());

    let likesMap = new Map<string, LikeStatus>();

    if (userId && commentIds.length > 0) {
      const likes = await LikeModel.find({
        userId,
        commentId: { $in: commentIds },
      });

      likes.forEach(like => {
        likesMap.set(like.commentId, like.status);
      });
    }

    const commentsForFront: CommentWithLikesOutput[] = comments.map(comment => ({
      id: comment._id.toString(),
      content: comment.content,
      commentatorInfo: comment.commentatorInfo,
      createdAt: comment.createdAt,
      likesInfo: {
        likesCount: comment.likesInfo.likesCount,
        dislikesCount: comment.likesInfo.dislikesCount,
        myStatus: likesMap.get(comment._id.toString()) ?? LikeStatus.None
      }
    }))

    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: commentsForFront
    }

    // const paramsForFront = {
    //   pagesCount: Math.ceil(totalCount / query.pageSize),
    //   page: query.pageNumber,
    //   pageSize: query.pageSize,
    //   totalCount: totalCount,
    // }
    // const commentsForFront = comments.map(mapToCommentViewModel)
    // return finalCommentMapper(commentsForFront, paramsForFront);
  }
}

