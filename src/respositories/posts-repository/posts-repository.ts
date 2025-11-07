import {Post} from "../../core/types/posts-types/posts-types";
import {ObjectId, SortDirection, WithId} from "mongodb";
import {postsCollection} from "../../db/mongo.db";
import {PostInputDto} from "../../input-types/posts-input-type/post.input-dto";
import {BlogInputWithoutSearch} from "../../input/blogs-input/blog-input-without-search";
import {
  OutputTypeWithPagination
} from "../../common/blog-output-with-pagintaion.type";
import {PostOutput} from "../../core/types/posts-types/post-output.type";
import {mapToPostViewModel} from "../../mappers/posts-mappers/map-to-post-view-model";
import {ParamsForFrontOutput} from "../../core/types/blogs-types/blogs-output-types/blog-params-for-front-output";

export const finalPostMapper = (dto: PostOutput[], params: ParamsForFrontOutput):OutputTypeWithPagination<PostOutput> => {
    return {
      pagesCount: params.pagesCount,
      page: params.page,
      pageSize: params.pageSize,
      totalCount: params.totalCount,
      items: dto
    }
  }

  export type paginationForRepo = {
    sortBy: string,
    sortDirection: SortDirection,
    pageNumber: number,
    pageSize: number
  }

export const postsRepository = {
  async findPosts(query: paginationForRepo): Promise<OutputTypeWithPagination<PostOutput>> {

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
  async updatePost(id: string, newData: PostInputDto): Promise<void> {
    const updatedPost = await postsCollection.updateOne(
      {_id: new ObjectId(id)},
      {
        $set: {
          title: newData.title,
          shortDescription: newData.shortDescription,
          content: newData.content,
          blogId: new ObjectId(newData.blogId)
        }
      }
    );
    if (updatedPost.matchedCount < 1) {
      throw new Error("Post not exist")
    }
    return
  },
  async createPost(newPost: Post): Promise<WithId<Post>> {
    const insertResult = await postsCollection.insertOne(newPost);
    return {...newPost, _id: insertResult.insertedId};
  },
  async deletePost(id: string) {
    const deletedPost = await postsCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedPost.deletedCount < 1) {
      throw new Error("Post not exist")
    }
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
