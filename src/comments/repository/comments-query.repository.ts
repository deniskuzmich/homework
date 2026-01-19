import {mapToCommentViewModel} from "../mapper/map-to-comment-view-model";
import {CommentOutput} from "../types/main-types/comment-output.type";
import {finalCommentMapper} from "../mapper/final-comment-mapper";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {InputPaginationForRepo} from "../../common/types/input/input-pagination-for-repo.type";
import {injectable} from "inversify";
import {CommentModel} from "../../entity/comments.entity";
import {LikeStatus} from "../enum/like-enum";
import {LikeModel} from "../../entity/likes.entity";

@injectable()
export class CommentsQueryRepository {
  async getCommentById(
    commentId: string,
    userId: string | null
  ): Promise<CommentOutput | null> {

    const comment = await CommentModel.findById(commentId)
    if (!comment) return null

    let myStatus = LikeStatus.None

    if (userId) {
      const like = await LikeModel.findOne({userId, commentId})
      if (like) {
        myStatus = like.status
      }
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
  // async getCommentById(commentId: string, userId: string | null): Promise<CommentOutput | null> {
  //   const comment = await CommentModel.findOne({_id: commentId})
  //   if (!comment) return null;
  //
  //   return mapToCommentViewModel(comment)
  // }

  async getCommentByPostIdWithPagination(id: string, query: InputPaginationForRepo): Promise<OutputTypeWithPagination<CommentOutput>> {
    const skip = (query.pageSize * query.pageNumber) - query.pageSize;

    const sort = {[query.sortBy]: query.sortDirection}

    const comments = await CommentModel
      .find({postId: id})
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort)


    const totalCount = await CommentModel.countDocuments({postId: id});

    const paramsForFront = {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalCount,
    }
    const commentsForFront = comments.map(mapToCommentViewModel)
    return finalCommentMapper(commentsForFront, paramsForFront);
  }
}

