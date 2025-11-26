import {Post} from "../types/main-types/posts-db.type";
import {ObjectId, WithId} from "mongodb";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {postsRepository} from "../repository/posts-repository";
import {blogsRepository} from "../../blogs/repository/blogs-repository";
import {PostOutput} from "../types/main-types/post-output.type";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {QueryInputForPagination} from "../../common/types/input/query-input-for-pagination";
import {valuesPaginationMaper} from "../../blogs/mapper/post-for-blog-mapper";
import {BlogInputWithoutSearch} from "../../blogs/types/input-types/blog-input-without-search";
import {postsQueryRepository} from "../repository/posts-query-repository";
import {blogsQueryRepository} from "../../blogs/repository/blogs-query-repository";
import {CommentOutput} from "../../feedback/types/main-types/comment-output.type";
import {UserInfoType} from "../../users/types/output-types/user-info.type";
import {commentsRepository} from "../../feedback/repository/comments.repository";
import {ResultStatus} from "../../common/types/result.status";
import {ResultType} from "../../common/types/result.type";

export const postsService = {
  async findPosts(query: QueryInputForPagination): Promise<OutputTypeWithPagination<PostOutput>> {
    const values: BlogInputWithoutSearch  = valuesPaginationMaper(query)
    return postsQueryRepository.findPosts(values)
  },
  async getPostById(id: string): Promise<WithId<Post> | null> {
    return postsQueryRepository.getPostById(id);
  },

  async updatePost(id: string, newData: PostInputDto): Promise<void> {
    const updatedPost = await postsRepository.updatePost(id, newData);
    return
  },
  async createPost(newData: PostInputDto): Promise<WithId<Post> | null> {

    const blog = await blogsQueryRepository.getBlogById(newData.blogId);
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
