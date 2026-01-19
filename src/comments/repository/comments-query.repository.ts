import { mapToCommentViewModel } from "../mapper/map-to-comment-view-model";
import { CommentOutput } from "../types/main-types/comment-output.type";
import { finalCommentMapper } from "../mapper/final-comment-mapper";
import { OutputTypeWithPagination } from "../../common/types/output-with-pagintaion.type";
import { InputPaginationForRepo } from "../../common/types/input/input-pagination-for-repo.type";
import { injectable } from "inversify";
import { CommentModel } from "../../entity/comments.entity";
import { LikeModel } from "../../entity/likes.entity";
import {LikeStatus} from "../enum/like-enum";


@injectable()
export class CommentsQueryRepository {

  async getCommentById(
    commentId: string,
    userId: string | null
  ): Promise<CommentOutput | null> {

    const comment = await CommentModel.findOne({ _id: commentId });
    if (!comment) return null;

    let myStatus = LikeStatus.None;

    if (userId) {
      const like = await LikeModel.findOne({
        commentId,
        userId
      });

      if (like) {
        myStatus = like.myStatus;
      }
    }

    return mapToCommentViewModel(comment, myStatus);
  }

  async getCommentByPostIdWithPagination(
    postId: string,
    query: InputPaginationForRepo,
    userId: string | null
  ): Promise<OutputTypeWithPagination<CommentOutput>> {

    const skip = (query.pageSize * query.pageNumber) - query.pageSize;
    const sort = { [query.sortBy]: query.sortDirection };

    const comments = await CommentModel
      .find({ postId })
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort);

    const totalCount = await CommentModel.countDocuments({ postId });

    const commentsForFront = await Promise.all(
      comments.map(async (comment) => {
        let myStatus = LikeStatus.None;

        if (userId) {
          const like = await LikeModel.findOne({
            commentId: comment._id.toString(),
            userId
          });

          if (like) {
            myStatus = like.myStatus;
          }
        }

        return mapToCommentViewModel(comment, myStatus);
      })
    );

    return finalCommentMapper(commentsForFront, {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount
    });
  }
}
