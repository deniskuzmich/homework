import {Post} from "../core/types/posts-types";
import {WithId} from "mongodb";
import {PostInputDto} from "../input-types/post.input-dto";
import {postsRepository} from "../respositories/posts-repository";
import {blogsService} from "./blogs.service";

export const postsService = {
  async findPosts(): Promise<WithId<Post>[]> {
    return postsRepository.findPosts()
  },
  async getPostById(id: string): Promise<WithId<Post> | null> {
    return postsRepository.getPostById(id);
  },
  async updatePost(id: string, newData: PostInputDto): Promise<void> {
    const updatedPost = await postsRepository.updatePost(id, newData);
    return
  },
  async createPost(newData: PostInputDto): Promise<WithId<Post> | null> {

    const blog = await blogsService.getBlogById(newData.blogId);
    if (!blog) return null;

    const newPost: Post = {
      title: newData.title,
      shortDescription: newData.shortDescription,
      content: newData.content,
      blogId: newData.blogId,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    const createdPost = await postsRepository.createPost(newPost);
    return createdPost
  },
  async deletePost(id: string) {
    const deletedPost = await postsRepository.deletePost(id);
  },
};
