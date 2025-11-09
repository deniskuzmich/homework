import {Blog} from "../types/main-types/blog-db.type";
import {ObjectId, WithId} from "mongodb";
import {blogsCollection} from "../../db/mongo.db";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {mapToBlogViewModel} from "../mapper/map-to-blog-view-model";
import {BlogInput} from "../types/main-types/blog-input.type";
import {
  OutputTypeWithPagination
} from "../../common/types/blog-output-with-pagintaion.type";
import {BlogOutput} from "../types/main-types/blog-output.type";
import {finalBlogMapper} from "../mapper/final-blog-map";

export const blogsRepository = {
  async findBlogs(queryDto: BlogInput): Promise<OutputTypeWithPagination<BlogOutput>> {

    const skip = (queryDto.pageNumber - 1) * queryDto.pageSize;

    const searchFilter =
      queryDto.searchNameTerm ? {
        name: {
          $regex: queryDto.searchNameTerm,
          $options: "i",
        }
      }: {} //если строка поиска пустая - возвращаем все блоги

    const items = await blogsCollection //запрос в db
      .find(searchFilter)
      .skip(skip)
      .limit(queryDto.pageSize)
      .sort({[queryDto.sortBy]: queryDto.sortDirection})
      .toArray();

    const totalCount = await blogsCollection.countDocuments(searchFilter) //общее кол-во элементов

    const paramsForFront = { //мазоль, которая идет во фронт
      pagesCount: Math.ceil(totalCount / queryDto.pageSize),
      page: queryDto.pageNumber,
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
