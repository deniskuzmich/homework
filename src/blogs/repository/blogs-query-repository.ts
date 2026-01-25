import {BlogInput} from "../types/main-types/blog-input.type";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {BlogOutput} from "../types/main-types/blog-output.type";
import {mapToBlogViewModel} from "../mapper/map-to-blog-view-model";
import {finalBlogMapper} from "../mapper/final-blog-map";
import {injectable} from "inversify";
import {BlogDocument, BlogModel} from "../../entity/blogs.entity";

@injectable()
export class BlogsQueryRepository {
  async findBlogs(queryDto: BlogInput): Promise<OutputTypeWithPagination<BlogOutput>> {

    const skip = (queryDto.pageNumber - 1) * queryDto.pageSize;

    const searchFilter =
      queryDto.searchNameTerm ? {
        name: {
          $regex: queryDto.searchNameTerm,
          $options: "i",
        }
      }: {} //если строка поиска пустая - возвращаем все блоги

    const items = await BlogModel
      .find(searchFilter)
      .skip(skip)
      .limit(queryDto.pageSize)
      .sort({[queryDto.sortBy]: queryDto.sortDirection})



    const totalCount = await BlogModel.countDocuments(searchFilter) //общее кол-во элементов

    const paramsForFront = { //мазоль, которая идет во фронт
      pagesCount: Math.ceil(totalCount / queryDto.pageSize),
      page: queryDto.pageNumber,
      pageSize: queryDto.pageSize,
      totalCount: totalCount,
    }

    const blogForFront = items.map(mapToBlogViewModel)
    return finalBlogMapper(blogForFront, paramsForFront);
  }

  async getBlogById(id: string): Promise<BlogOutput | null> {
    const blog = await BlogModel.findOne({_id: id});
    if (!blog) {
      return null
    }
    return mapToBlogViewModel(blog)
  }
}

