import {PostInputDto} from "../types/main-types/post.input-dto";
import {PostsRepository} from "../repository/posts-repository";
import {BlogsRepository} from "../../blogs/repository/blogs-repository";
import {inject, injectable} from "inversify";
import {PostDocument, PostModel} from "../../entity/posts.entity";
import {LikeStatus} from "../../comments/enum/like-enum";
import {ResultType} from "../../common/types/result.type";
import {ResultStatus} from "../../common/types/result.status";
import {LikeModel} from "../../entity/likes.entity";

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

  async createPost(newData: PostInputDto): Promise<string | null> {
    const blog = await this.blogsRepository.getBlogById(newData.blogId);
    if (!blog) return null;

    const newPost = PostModel.createPost(blog,newData);

    const createdPost = await this.postsRepository.save(newPost);
    return createdPost.id
  }

  async updatePost(id: string, newData: PostInputDto): Promise<boolean> {
    const post = await this.postsRepository.getPostById(id);
    if (!post) return false

    post.updatePost(newData);

     await this.postsRepository.save(post);
    return true
  }

  async deletePost(id: string) {
   return await this.postsRepository.deletePost(id);
  }

  // async updateLikeForPost(
  //   postId: string,
  //   userId: string,
  //   likeStatus: LikeStatus
  // ): Promise<ResultType> {
  //
  //   const post = await this.postsRepository.getPostById(postId);
  //   if (!post) {
  //     return {
  //       status: ResultStatus.NotFound,
  //       data: null,
  //       extensions: [],
  //       errorMessage: 'Comment not found'
  //     }
  //   }
  //
  //   const existingLike = await LikeModel.findOne({ userId, postId });
  //
  //   // CASE 1: статус тот же — ничего не меняем
  //   if (existingLike && existingLike.status === likeStatus) {
  //     return { status: ResultStatus.NoContent, data: null, extensions: [] }
  //   }
  //
  //   // CASE 2: новый лайк
  //   if (!existingLike && likeStatus !== LikeStatus.None) {
  //     await LikeModel.create({ userId, postId, status: likeStatus });
  //
  //     if (likeStatus === LikeStatus.Like) post.likesInfo.likesCount += 1;
  //     if (likeStatus === LikeStatus.Dislike) post.likesInfo.dislikesCount += 1;
  //
  //     await post.save();
  //     return { status: ResultStatus.NoContent, data: null, extensions: [] }
  //   }
  //
  //   // CASE 3: удаление лайка (None)
  //   if (existingLike && likeStatus === LikeStatus.None) {
  //     if (existingLike.status === LikeStatus.Like) post.likesInfo.likesCount -= 1;
  //     if (existingLike.status === LikeStatus.Dislike) post.likesInfo.dislikesCount -= 1;
  //
  //     await existingLike.deleteOne();
  //     await post.save();
  //     return { status: ResultStatus.NoContent, data: null, extensions: [] }
  //   }
  //
  //   // CASE 4: смена Like ↔ Dislike
  //   if (existingLike && likeStatus !== LikeStatus.None) {
  //     if (existingLike.status === LikeStatus.Like) post.likesInfo.likesCount -= 1;
  //     if (existingLike.status === LikeStatus.Dislike) post.likesInfo.dislikesCount -= 1;
  //
  //     if (likeStatus === LikeStatus.Like) post.likesInfo.likesCount += 1;
  //     if (likeStatus === LikeStatus.Dislike) post.likesInfo.dislikesCount += 1;
  //
  //     existingLike.status = likeStatus;
  //     await existingLike.save();
  //     await post.save();
  //
  //     return { status: ResultStatus.NoContent, data: null, extensions: [] }
  //   }
  //
  //   return { status: ResultStatus.NoContent, data: null, extensions: [] }
  // }
};

