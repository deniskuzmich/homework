import {InputWithoutSearch} from "../../blogs/types/input-types/input-without-search";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {PostOutput} from "../types/main-types/post-output.type";
import {mapToPostViewModel} from "../mapper/map-to-post-view-model";
import {finalPostMapper} from "../mapper/final-post-map";
import {InputPaginationForRepo} from "../../common/types/input/input-pagination-for-repo.type";
import {injectable} from "inversify";
import {PostModel} from "../../entity/posts.entity";

@injectable()
export class PostsQueryRepository {
  async findPosts(query: InputPaginationForRepo): Promise<OutputTypeWithPagination<PostOutput>> {

    const skip = (query.pageSize * query.pageNumber) - query.pageSize;

    const sort = {[query.sortBy]: query.sortDirection}

    const posts = await PostModel
      .find()
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort)

    const totalCount = await PostModel.countDocuments();

    const paramsForFront = { //мазоль, которая идет во фронт
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalCount,
    }

    const postsForFront = posts.map(mapToPostViewModel)
    return finalPostMapper(postsForFront, paramsForFront);
  }

  async getPostById(id: string): Promise<PostOutput | null> {
    const post = await PostModel.findOne({_id: id});
    if (!post) return null
    return  mapToPostViewModel(post)
  }

  async getPostByBlogId(id: string, query: InputWithoutSearch): Promise<OutputTypeWithPagination<PostOutput>> {

    const skip = (query.pageSize * query.pageNumber) - query.pageSize;

    const sort = {[query.sortBy]: query.sortDirection}

    const posts = await PostModel
      .find({blogId: id})
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort)


    const totalCount = await PostModel.countDocuments({blogId: id});

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

