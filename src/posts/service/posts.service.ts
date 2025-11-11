import {Post} from "../types/main-types/posts-db.type";
import {ObjectId, WithId} from "mongodb";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {postsRepository} from "../repository/posts-repository";
import {blogsRepository} from "../../blogs/repository/blogs-repository";
import {PostOutput} from "../types/main-types/post-output.type";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {BlogQueryInputWithoutSearch} from "../../blogs/types/input-types/blog-query-input-without-search";
import {valuesPaginationMaper} from "../../blogs/middleware-validation/post-for-blog-pagination";
import {BlogInputWithoutSearch} from "../../blogs/types/input-types/blog-input-without-search";

export const postsService = {
  async findPosts(query: BlogQueryInputWithoutSearch): Promise<OutputTypeWithPagination<PostOutput>> {
    const values: BlogInputWithoutSearch  = valuesPaginationMaper(query)
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
