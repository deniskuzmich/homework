import {Post} from "../types/main-types/posts-db.type";
import {ObjectId, WithId} from "mongodb";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {PostsRepository} from "../repository/posts-repository";
import {BlogsRepository} from "../../blogs/repository/blogs-repository";
import {inject, injectable} from "inversify";

@injectable()
export class PostsService {

  constructor(
    @inject(PostsRepository)
    public postsRepository: PostsRepository,
    @inject(BlogsRepository)
    public blogsRepository: BlogsRepository) {}

  async getPostById(id: string): Promise<WithId<Post> | null> {
    return this.postsRepository.getPostById(id);
  }

  async updatePost(id: string, newData: PostInputDto): Promise<void> {
    return await this.postsRepository.updatePost(id, newData);
  }

  async createPost(newData: PostInputDto): Promise<WithId<Post> | null> {

    const blog = await this.blogsRepository.getBlogById(newData.blogId);
    if (!blog) return null;

    const newPost: Post = {
      title: newData.title,
      shortDescription: newData.shortDescription,
      content: newData.content,
      blogId: new ObjectId(newData.blogId),
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    const createdPost = await this.postsRepository.createPost(newPost);
    return createdPost
  }

  async deletePost(id: string) {
   return await this.postsRepository.deletePost(id);
  }
};

