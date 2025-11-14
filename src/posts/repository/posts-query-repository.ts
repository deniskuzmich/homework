import {Post} from "../types/main-types/posts-db.type";
import {ObjectId, SortDirection, WithId} from "mongodb";
import {postsCollection} from "../../db/mongo.db";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {BlogInputWithoutSearch} from "../../blogs/types/input-types/blog-input-without-search";
import {
  OutputTypeWithPagination
} from "../../common/types/output-with-pagintaion.type";
import {PostOutput} from "../types/main-types/post-output.type";
import {mapToPostViewModel} from "../mapper/map-to-post-view-model";
import {finalPostMapper} from "../mapper/final-post-map";
import {InputPaginationForRepo} from "../types/input-types/input-pagination.type";

export const postsQueryRepository = {
  async findPosts(query: InputPaginationForRepo): Promise<OutputTypeWithPagination<PostOutput>> {

    const skip = (query.pageSize * query.pageNumber) - query.pageSize;

    const sort = {[query.sortBy]: query.sortDirection}

    const posts = await postsCollection
      .find()
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort)
      .toArray();

    const totalCount = await postsCollection.countDocuments();

    const paramsForFront = { //мазоль, которая идет во фронт
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalCount,
    }

    const postsForFront = posts.map(mapToPostViewModel)
    return finalPostMapper(postsForFront, paramsForFront);
  },

  async getPostById(id: string): Promise<WithId<Post> | null> {
    return postsCollection.findOne({_id: new ObjectId(id)});
  },

  async getPostByBlogId(id: string, query: BlogInputWithoutSearch): Promise<OutputTypeWithPagination<PostOutput>> {

    const skip = (query.pageSize * query.pageNumber) - query.pageSize;

    const sort = {[query.sortBy]: query.sortDirection}

    const posts = await postsCollection
      .find({blogId: new ObjectId(id)})
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort)
      .toArray();

    const totalCount = await postsCollection.countDocuments({blogId: new ObjectId(id)});

    const paramsForFront = { //мазоль, которая идет во фронт
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalCount,
    }
    const postsForFront = posts.map(mapToPostViewModel)
    return finalPostMapper(postsForFront, paramsForFront);
  }
};
