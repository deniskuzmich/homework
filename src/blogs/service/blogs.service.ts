import {Blog} from "../types/main-types/blog-db.type";
import {WithId} from "mongodb";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {Post} from "../../posts/types/main-types/posts-db.type";
import {PostInputDtoForBlog} from "../../posts/types/input-types/input-dto-pagination-for-blog.type";
import {PostsRepository} from "../../posts/repository/posts-repository";
import {BlogsRepository} from "../repository/blogs-repository";
import {injectable, inject} from "inversify";

@injectable()
export class BlogsService {

  constructor(
    @inject(BlogsRepository)
    public blogsRepository: BlogsRepository,
    @inject(PostsRepository)
    public postsRepository: PostsRepository) {}

  async getBlogById(id: string): Promise<WithId<Blog> | null> {
    return this.blogsRepository.getBlogById(id);
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
    return await this.blogsRepository.updateBlog(id, newData);
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
    return await this.blogsRepository.deleteBlog(id);
  }
};

