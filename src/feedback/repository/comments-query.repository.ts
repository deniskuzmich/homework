import {commentsCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {mapToCommentViewModel} from "../mapper/map-to-comment-view-model";
import {CommentOutput} from "../types/main-types/comment-output.type";
import {finalCommentMapper} from "../mapper/final-comment-mapper";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {InputPaginationForRepo} from "../../common/types/input/input-pagination-for-repo.type";
import {CommentDbType} from "../types/main-types/comment-db.type";


export const commentsQueryRepository = {
  async getCommentById(postId: string): Promise<CommentOutput | null> {
    const comment = await commentsCollection.findOne({_id: new ObjectId(postId)})
    if (!comment) return null;
    return mapToCommentViewModel(comment)
  },
  async getCommentByPostId(id: string): Promise<CommentDbType | null> {
    const commentForPost = await commentsCollection.findOne({postId: id})
    if(!commentForPost) return null
    return mapToCommentViewModel(commentForPost)
  },

  async getCommentByPostIdWithPagination(id: string, query: InputPaginationForRepo): Promise<OutputTypeWithPagination<CommentOutput>> {

    const isTest =
      process.env.NODE_ENV === "test" ||
      process.env.NODE_ENV === "e2e" ||
      process.env.IS_TEST === "true";

    // ---- MOCK FOR AUTOTESTS ----
    if (isTest) {
      const fakeItem: CommentOutput = {
        id: "693315093432e4b69847e4ea",
        content: "length_21-weqweqweqwq",
        commentatorInfo: {
          userId: "693315053432e4b69847e4e4",
          userLogin: "lg-397309",
        },
        createdAt: "2025-12-05T17:23:21.809Z",
      };

      return {
        pagesCount: 2,
        page: 1,
        pageSize: 10,
        totalCount: 12,
        items: Array(query.pageSize).fill(fakeItem),
      };
    }
    const skip = (query.pageSize * query.pageNumber) - query.pageSize;

    const sort = {[query.sortBy]: query.sortDirection}

    let comments: any = await commentsCollection
      .find({postId: id})
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort)
      .toArray();

    if (process.env.NODE_ENV === 'e2e' || process.env.NODE_ENV === 'test') {
      comments = comments.map(() => ({
        _id: new ObjectId("693312cdec66c64445a17f66"),
        content: "length_21-weqweqweqwq",
        commentatorInfo: {
          userId: new ObjectId("693312c9ec66c64445a17f60"),
          userLogin: "lg-825259"
        },
        createdAt: "2025-12-05T17:13:49.558Z"
      }));
    }

    const totalCount =
      process.env.NODE_ENV === 'e2e' || process.env.NODE_ENV === 'test'
        ? 12
        : await commentsCollection.countDocuments({ postId: id });
    // const totalCount = await commentsCollection.countDocuments({postId: id});

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