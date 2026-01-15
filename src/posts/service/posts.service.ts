import {PostInputDto} from "../types/main-types/post.input-dto";
import {PostsRepository} from "../repository/posts-repository";
import {BlogsRepository} from "../../blogs/repository/blogs-repository";
import {inject, injectable} from "inversify";
import {PostDocument, PostModel} from "../../entity/posts.entity";

@injectable()
export class PostsService {

  constructor(
    @inject(PostsRepository)
    public postsRepository: PostsRepository,
    @inject(BlogsRepository)
    public blogsRepository: BlogsRepository) {}

  async getPostById(id: string): Promise<PostDocument | null> {
    return this.postsRepository.getPostById(id);
  }

  async updatePost(id: string, newData: PostInputDto): Promise<boolean> {
    const post = await this.postsRepository.getPostById(id);
    if (!post) return false

      post.title = newData.title,
      post.shortDescription = newData.shortDescription,
      post.content = newData.content,
      post.blogId = newData.blogId

     await this.postsRepository.save(post);
    return true
  }

  async createPost(newData: PostInputDto): Promise<string | null> {
    const blog = await this.blogsRepository.getBlogById(newData.blogId);
    if (!blog) return null;

    const newPost = new PostModel()
      newPost.title= newData.title;
      newPost.shortDescription= newData.shortDescription;
      newPost.content= newData.content;
      newPost.blogId = blog.id;
      newPost.blogName = blog.name;
      newPost.createdAt= new Date().toISOString();

    await this.postsRepository.save(newPost);
    return newPost.id
  }

  async deletePost(id: string) {
   return await this.postsRepository.deletePost(id);
  }
};

