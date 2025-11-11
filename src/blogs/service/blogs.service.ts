import {Blog} from "../types/main-types/blog-db.type";
import {SortDirection, WithId} from "mongodb";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {blogsRepository} from "../repository/blogs-repository";
import {BlogQueryInput} from "../types/input-types/blogs-query.input";
import {BlogInput} from "../types/main-types/blog-input.type";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {postsRepository} from "../../posts/repository/posts-repository";
import {Post} from "../../posts/types/main-types/posts-db.type";
import {BlogInputWithoutSearch} from "../types/input-types/blog-input-without-search";
import {PostOutput} from "../../posts/types/main-types/post-output.type";
import {BlogOutput} from "../types/main-types/blog-output.type";
import {valuesPaginationMaper} from "../middleware-validation/post-for-blog-pagination";
import {BlogQueryInputWithoutSearch} from "../types/input-types/blog-query-input-without-search";
import {PostInputDtoForBlog} from "../../posts/types/input-types/input-dto-pagination-for-blog.type";


export const blogsService = {
  async findBlogs(queryDto: BlogQueryInput):  Promise<OutputTypeWithPagination<BlogOutput>> {
    const foundBlogs: BlogInput = {
      pageNumber: queryDto.pageNumber ? Number(queryDto.pageNumber) : 1,
      pageSize: queryDto.pageSize ? Number(queryDto.pageSize): 10,
      sortBy: queryDto.sortBy ? queryDto.sortBy : 'createdAt',
      sortDirection: queryDto.sortDirection ? queryDto.sortDirection : 'desc',
      searchNameTerm: queryDto.searchNameTerm ? queryDto.searchNameTerm : null,
    }
    return blogsRepository.findBlogs(foundBlogs);
  },
  async getBlogById(id: string): Promise<WithId<Blog> | null> {
    return blogsRepository.getBlogById(id);
  },

  async getPostByBlogId(id: string, query: BlogQueryInputWithoutSearch): Promise<OutputTypeWithPagination<PostOutput> | null> {
    const blog: WithId<Blog> | null = await blogsRepository.getBlogById(id)
    if (!blog) {
      return null;
    }
    const values: BlogInputWithoutSearch = valuesPaginationMaper(query);
    return await postsRepository.getPostByBlogId(id, values)
  },

  async createPostForBlog(blog: WithId<Blog>, inputInfo: PostInputDtoForBlog): Promise<WithId<Post>> {
    const newPostByBlogId = {
      title: inputInfo.title,
      shortDescription: inputInfo.shortDescription,
      content: inputInfo.content,
      blogId: blog._id,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    }
    return postsRepository.createPost(newPostByBlogId)
  },

  async updateBlog(id: string, newData: BlogInputDto): Promise<void> {
     const updatedBlog = await blogsRepository.updateBlog(id, newData);
     return
  },
  async createBlog(newData: BlogInputDto): Promise<WithId<Blog>> {
    const newBlog: Blog = {
      name: newData.name,
      description: newData.description,
      websiteUrl: newData.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false
    }
    const createdBlog = await blogsRepository.createBlog(newBlog);
    return createdBlog;
  },
  async deleteBlog(id: string): Promise<void> {
    const deletedBlog = await blogsRepository.deleteBlog(id);
  },
};
