import {ObjectId, WithId} from "mongodb";
import {Blog} from "../types/main-types/blog-db.type";
import {blogsCollection} from "../../db/mongo.db";
import {BlogInput} from "../types/main-types/blog-input.type";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {BlogOutput} from "../types/main-types/blog-output.type";
import {mapToBlogViewModel} from "../mapper/map-to-blog-view-model";
import {finalBlogMapper} from "../mapper/final-blog-map";

export const blogsQueryRepository = {
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

    const blogForFront = items.map(mapToBlogViewModel)
    return finalBlogMapper(blogForFront, paramsForFront);

  },

  async getBlogById(id: string): Promise<WithId<Blog> | null> {
    return blogsCollection.findOne({_id: new ObjectId(id)});
  },}