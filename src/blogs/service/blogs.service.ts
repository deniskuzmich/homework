import {Blog} from "../types/main-types/blog-db.type";
import {WithId} from "mongodb";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {blogsRepository} from "../repository/blogs-repository";
import {postsRepository} from "../../posts/repository/posts-repository";
import {Post} from "../../posts/types/main-types/posts-db.type";
import {PostInputDtoForBlog} from "../../posts/types/input-types/input-dto-pagination-for-blog.type";


export const blogsService = {
  async getBlogById(id: string): Promise<WithId<Blog> | null> {
    return blogsRepository.getBlogById(id);
  },

  async getPostByBlogId(id: string): Promise<WithId<Post> | null> {
    const blog = await blogsRepository.getBlogById(id)
    if (!blog) {
      return null;
    }
    return await postsRepository.getPostByBlogId(blog._id.toString())
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
    return await blogsRepository.createBlog(newBlog);
  },
  async deleteBlog(id: string): Promise<void> {
    const deletedBlog = await blogsRepository.deleteBlog(id);
  },
};
