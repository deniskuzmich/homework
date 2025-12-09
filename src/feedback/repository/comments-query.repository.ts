import {commentsCollection} from "../../db/mongo.db";
import {ObjectId} from "mongodb";
import {mapToCommentViewModel} from "../mapper/map-to-comment-view-model";
import {CommentOutput} from "../types/main-types/comment-output.type";
import {finalCommentMapper} from "../mapper/final-comment-mapper";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {InputPaginationForRepo} from "../../common/types/input/input-pagination-for-repo.type";


export const commentsQueryRepository = {
  async getCommentById(postId: string): Promise<CommentOutput | null> {
    const comment = await commentsCollection.findOne({_id: new ObjectId(postId)})
    if (!comment) return null;
    return mapToCommentViewModel(comment)
  },
  async getCommentByPostIdWithPagination(id: string, query: InputPaginationForRepo): Promise<OutputTypeWithPagination<CommentOutput>> {
    const skip = (query.pageSize * query.pageNumber) - query.pageSize;

    const sort = {[query.sortBy]: query.sortDirection}

    const comments = await commentsCollection
      .find({postId: id})
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort)
      .toArray();

    const totalCount = await commentsCollection.countDocuments({postId: id});

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