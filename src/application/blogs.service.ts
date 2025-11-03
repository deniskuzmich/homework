import {Blog} from "../core/types/blogs-types";
import {WithId} from "mongodb";
import {BlogInputDto} from "../input-types/blog.input-dto";
import {blogsRepository} from "../respositories/blogs-repository";

export const blogsService = {
  async findBlogs(): Promise<WithId<Blog>[]> {
    return blogsRepository.findBlogs();
  },
  async getBlogById(id: string): Promise<WithId<Blog> | null> {
    return blogsRepository.getBlogById(id);
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
