import {Blog} from "../../core/types/blogs-types/blogs-types";
import {ObjectId, WithId} from "mongodb";
import {blogsCollection} from "../../db/mongo.db";
import {BlogInputDto} from "../../input-types/blogs-input-type/blog.input-dto";
import {mapToBlogViewModel} from "../../mappers/blogs-mappers/map-to-blog-view-model";
import {BlogViewModel} from "../../core/types/blogs-types/blogViewModel";
import {BlogInputWithSearch} from "../../input/blogs-input/blog-input-with-search";
import {ParamsForFrontOutput} from "../../core/types/blogs-types/blogs-output-types/blog-params-for-front-output";
import {
  OutputTypeWithPagination
} from "../../common/blog-output-with-pagintaion.type";
import {BlogOutput} from "../../core/types/blogs-types/blogs-output-types/blog-output.type";


export const finalBlogMapper = (dto: BlogViewModel[], params: ParamsForFrontOutput) => {
  return {
    pagesCount: params.pagesCount,
    page: params.page,
    pageSize: params.pageSize,
    totalCount: params.totalCount,
    items: dto
  }
}

export const blogsRepository = {
  async findBlogs(queryDto: BlogInputWithSearch): Promise<OutputTypeWithPagination<BlogOutput>> {

    const skip = (queryDto.pagesNumber - 1) * queryDto.pageSize;

    const searchFilter =
      queryDto.searchNameTerm ? {
        name: {
          $regex: queryDto.searchNameTerm,
          $options: "i",

        }
      }: {}

    const items = await blogsCollection //запрос в db
      .find(searchFilter)
      .sort({[queryDto.sortBy]: queryDto.sortDirection === 'asc' ? 1 : -1})
      .skip(skip)
      .limit(queryDto.pageSize)
      .toArray();

    const totalCount = await blogsCollection.countDocuments({searchFilter}) //общее кол-во элементов

    const paramsForFront = { //мазоль, которая идет во фронт
      pagesCount: Math.ceil(totalCount / queryDto.pageSize),
      page: queryDto.pagesNumber,
      pageSize: queryDto.pageSize,
      totalCount: totalCount,
    }

    const BlogForFront = items.map(mapToBlogViewModel)
    return finalBlogMapper(BlogForFront, paramsForFront);

  },
  async getBlogById(id: string): Promise<WithId<Blog> | null> {
    return blogsCollection.findOne({_id: new ObjectId(id)});
  },
  async updateBlog(id: string, newData: BlogInputDto): Promise<void> {
    const updatedBlog = await blogsCollection.updateOne(
      {_id: new ObjectId(id)},
      {
        $set: {
          name: newData.name,
          description: newData.description,
          websiteUrl: newData.websiteUrl
        }
      }
    );
    if (updatedBlog.matchedCount < 1) {
      throw new Error("Blog not exist")
    }
    return
  },
  async createBlog(newBlog: Blog): Promise<WithId<Blog>> {
    const insertResult = await blogsCollection.insertOne(newBlog);
    return {...newBlog, _id: insertResult.insertedId};
  },
  async deleteBlog(id: string): Promise<void> {
    const deletedBlog = await blogsCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedBlog.deletedCount < 1) {
      throw new Error("Blog not exist");
    }
  },
};
