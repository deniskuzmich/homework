import {Post} from "../core/types/posts-types/posts-types";
import {ObjectId, WithId} from "mongodb";
import {PostInputDto} from "../input-types/posts-input-type/post.input-dto";
import {paginationForRepo, postsRepository} from "../respositories/posts-repository/posts-repository";
import {blogsRepository} from "../respositories/blogs-repository/blogs-repository";
import {inputPagination} from "../handlers/blogs-hadlers/get-post-by-blog";
import {PostOutput} from "../core/types/posts-types/post-output.type";
import {OutputTypeWithPagination} from "../common/blog-output-with-pagintaion.type";
import {valuesPaginationMaper} from "./blogs.service";

export type PostInputDtoForBlog = {
  title: string,
  shortDescription: string,
  content: string
}

export const postsService = {
  async findPosts(query: inputPagination): Promise<OutputTypeWithPagination<PostOutput>> {
    const values: paginationForRepo  = valuesPaginationMaper(query)
    return postsRepository.findPosts(values)
  },
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
