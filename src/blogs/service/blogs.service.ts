import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {PostInputDtoForBlog} from "../../posts/types/input-types/input-dto-pagination-for-blog.type";
import {PostsRepository} from "../../posts/repository/posts-repository";
import {BlogsRepository} from "../repository/blogs-repository";
import {inject, injectable} from "inversify";
import {BlogDocument, BlogModel} from "../../entity/blogs.entity";
import {PostModel} from "../../entity/posts.entity";

@injectable()
export class BlogsService {

  constructor(
    @inject(BlogsRepository)
    public blogsRepository: BlogsRepository,
    @inject(PostsRepository)
    public postsRepository: PostsRepository) {
  }

  async getBlogById(id: string): Promise<BlogDocument | null> {
    return this.blogsRepository.getBlogById(id);
  }

  async createBlog(newData: BlogInputDto): Promise<string> {
    const newBlog = BlogModel.createBlog(newData);

   const createdBlog = await this.blogsRepository.save(newBlog);
    return createdBlog.id
  }

  async updateBlog(id: string, newData: BlogInputDto): Promise<boolean> {
    const blog = await this.blogsRepository.getBlogById(id)
    if (!blog) {
      return false
    }
    blog.updateBlog(newData)

    await this.blogsRepository.save(blog);
    return true
  }

  async createPostForBlog(blog: BlogDocument, inputInfo: PostInputDtoForBlog): Promise<string> {
    const newPostByBlogId = PostModel.createPostForBlog(blog, inputInfo);

    const createdPost = await this.postsRepository.save(newPostByBlogId)

    return createdPost.id
  }

  async deleteBlog(id: string): Promise<void> {
    return await this.blogsRepository.deleteBlog(id);
  }
};

