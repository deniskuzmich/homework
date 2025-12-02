import {Post} from "../types/main-types/posts-db.type";
import {ObjectId, WithId} from "mongodb";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {postsRepository} from "../repository/posts-repository";
import {blogsRepository} from "../../blogs/repository/blogs-repository";

export const postsService = {
  async getPostById(id: string): Promise<WithId<Post> | null> {
    return postsRepository.getPostById(id);
  },

  async updatePost(id: string, newData: PostInputDto): Promise<void> {
    const updatedPost = await postsRepository.updatePost(id, newData);
    return
  },
  async createPost(newData: PostInputDto): Promise<WithId<Post> | null> {

    const blog = await blogsRepository.getBlogById(newData.blogId);
    if (!blog) return null;

    const newPost: Post = {
      title: newData.title,
      shortDescription: newData.shortDescription,
      content: newData.content,
      blogId: new ObjectId(newData.blogId),
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
