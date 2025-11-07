import {Blog} from "../core/types/blogs-types/blogs-types";
import {SortDirection, WithId} from "mongodb";
import {BlogInputDto} from "../input-types/blogs-input-type/blog.input-dto";
import {blogsRepository} from "../respositories/blogs-repository/blogs-repository";
import {BlogQueryInput} from "../input/blogs-input/blogs-query.input";
import {BlogInputWithSearch} from "../input/blogs-input/blog-input-with-search";
import {BlogOutput} from "../core/types/blogs-types/blogs-output-types/blog-output.type";
import {OutputTypeWithPagination} from "../common/blog-output-with-pagintaion.type";
import {postsRepository} from "../respositories/posts-repository/posts-repository";
import {Post} from "../core/types/posts-types/posts-types";
import {PostInputDtoForBlog} from "./posts.service";
import {inputPagination} from "../handlers/blogs-hadlers/get-post-by-blog";
import {BlogInputWithoutSearch} from "../input/blogs-input/blog-input-without-search";
import {PostOutput} from "../core/types/posts-types/post-output.type";

export type BlogInputWithoutSearchMazol = {
  pageNumber?: string;
  pageSize?: string;
  sortBy?:string;
  sortDirection?: SortDirection;
};

export const valuesPaginationMaper = (query: BlogInputWithoutSearchMazol): BlogInputWithoutSearch => {
  return {
    pageNumber: query.pageNumber ? Number(query.pageNumber) : 1,
    pageSize: query.pageSize ? Number(query.pageSize) : 10,
    sortBy: query.sortBy ?? 'createdAt',
    sortDirection: query.sortDirection ?? 'desc',
  }
}

export const blogsService = {
  async findBlogs(queryDto: BlogQueryInput):  Promise<OutputTypeWithPagination<BlogOutput>> {
    const foundBlogs: BlogInputWithSearch = {
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

  async getPostByBlogId(id: string, query: inputPagination): Promise<OutputTypeWithPagination<PostOutput> | null> {
    const blog: WithId<Blog> | null = await blogsRepository.getBlogById(id)
    if (!blog) {
      return null;
    }
    const values: any = valuesPaginationMaper(query);
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
