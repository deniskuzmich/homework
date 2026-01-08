import {Blog} from "../types/main-types/blog-db.type";
import {WithId} from "mongodb";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {Post} from "../../posts/types/main-types/posts-db.type";
import {PostInputDtoForBlog} from "../../posts/types/input-types/input-dto-pagination-for-blog.type";
import {PostsRepository} from "../../posts/repository/posts-repository";
import {BlogsRepository} from "../repository/blogs-repository";

export class BlogsService {
  blogsRepository: BlogsRepository;
  postsRepository: PostsRepository;

  constructor(blogsRepository: BlogsRepository, postsRepository: PostsRepository) {
    this.blogsRepository = blogsRepository;
    this.postsRepository = postsRepository;
  }

  async getBlogById(id: string): Promise<WithId<Blog> | null> {
    return this.blogsRepository.getBlogById(id);
  }
  async getPostByBlogId(id: string): Promise<WithId<Post> | null> {
    const blog = await this.blogsRepository.getBlogById(id)
    if (!blog) {
      return null;
    }
    return await this.postsRepository.getPostByBlogId(blog._id.toString())
  }
  async createPostForBlog(blog: WithId<Blog>, inputInfo: PostInputDtoForBlog): Promise<WithId<Post>> {
    const newPostByBlogId = {
      title: inputInfo.title,
      shortDescription: inputInfo.shortDescription,
      content: inputInfo.content,
      blogId: blog._id,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    }
    return this.postsRepository.createPost(newPostByBlogId)
  }
  async updateBlog(id: string, newData: BlogInputDto): Promise<void> {
     const updatedBlog = await this.blogsRepository.updateBlog(id, newData);
     return
  }
  async createBlog(newData: BlogInputDto): Promise<WithId<Blog>> {
    const newBlog: Blog = {
      name: newData.name,
      description: newData.description,
      websiteUrl: newData.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false
    }
    return await this.blogsRepository.createBlog(newBlog);
  }
  async deleteBlog(id: string): Promise<void> {
    const deletedBlog = await this.blogsRepository.deleteBlog(id);
  }
};

