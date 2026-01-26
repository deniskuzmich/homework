import {PostInputDto} from "../types/main-types/post.input-dto";
import {PostsRepository} from "../repository/posts-repository";
import {BlogsRepository} from "../../blogs/repository/blogs-repository";
import {inject, injectable} from "inversify";
import {PostDocument, PostModel} from "../../entity/posts.entity";
import {LikeStatus} from "../../comments/enum/like-enum";
import {ResultType} from "../../common/types/result.type";
import {ResultStatus} from "../../common/types/result.status";
import {LikeModel} from "../../entity/likes-for-comments.entity";
import {LikeForPostModel} from "../../entity/likes-for-posts.entity";

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

  async updateLikeForPost(
    postId: string,
    userId: string,
    userLogin: string,
    likeStatus: LikeStatus
  ): Promise<ResultType> {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) return { status: ResultStatus.NotFound, data: null, extensions: [] };

    const existingLike = await LikeForPostModel.findOne({ userId, postId });

    // 1. Обработка счетчиков (логика такая же, как в комментариях)
    if (existingLike && existingLike.status === likeStatus) {
      return { status: ResultStatus.NoContent, data: null, extensions: [] };
    }

    // Обновляем счетчики в объекте post
    if (!existingLike && likeStatus !== LikeStatus.None) {
      if (likeStatus === LikeStatus.Like) post.extendedLikesInfo.likesCount += 1;
      if (likeStatus === LikeStatus.Dislike) post.extendedLikesInfo.dislikesCount += 1;
      await LikeForPostModel.create({ userId, postId, login: userLogin, status: likeStatus, addedAt: new Date().toISOString() });
    }
    else if (existingLike && likeStatus === LikeStatus.None) {
      if (existingLike.status === LikeStatus.Like) post.extendedLikesInfo.likesCount -= 1;
      if (existingLike.status === LikeStatus.Dislike) post.extendedLikesInfo.dislikesCount -= 1;
      await existingLike.deleteOne();
    }
    else if (existingLike && likeStatus !== LikeStatus.None) {
      if (existingLike.status === LikeStatus.Like) {
        post.extendedLikesInfo.likesCount -= 1;
        post.extendedLikesInfo.dislikesCount += 1;
      } else {
        post.extendedLikesInfo.likesCount += 1;
        post.extendedLikesInfo.dislikesCount -= 1;
      }
      existingLike.status = likeStatus;
      existingLike.addedAt = new Date().toISOString(); // Обновляем дату для newestLikes
      await existingLike.save();
    }

    await post.save();
    return { status: ResultStatus.NoContent, data: null, extensions: [] };
  }
};

