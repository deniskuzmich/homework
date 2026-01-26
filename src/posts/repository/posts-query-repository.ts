import {InputWithoutSearch} from "../../blogs/types/input-types/input-without-search";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {PostOutput} from "../types/main-types/post-output.type";
import {mapToPostViewModel} from "../mapper/map-to-post-view-model";
import {finalPostMapper} from "../mapper/final-post-map";
import {InputPaginationForRepo} from "../../common/types/input/input-pagination-for-repo.type";
import {injectable} from "inversify";
import {PostModel} from "../../entity/posts.entity";
import {LikeStatus} from "../../comments/enum/like-enum";
import {LikeForPostModel} from "../../entity/likes-for-posts.entity";

@injectable()
export class PostsQueryRepository {
  async findPosts(query: InputPaginationForRepo): Promise<OutputTypeWithPagination<PostOutput>> {

    const skip = (query.pageSize * query.pageNumber) - query.pageSize;

    const sort = {[query.sortBy]: query.sortDirection}

    const posts = await PostModel
      .find()
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort)

    const totalCount = await PostModel.countDocuments();

    const paramsForFront = { //мазоль, которая идет во фронт
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalCount,
    }

    const postsForFront = posts.map(mapToPostViewModel)
    return finalPostMapper(postsForFront, paramsForFront);
  }

  // async getPostById(id: string): Promise<PostOutput | null> {
  //   const post = await PostModel.findOne({_id: id});
  //   if (!post) return null
  //   return  mapToPostViewModel(post)
  // }

  async getPostById(postId: string, userId: string | null): Promise<PostOutput | null> {
    const post = await PostModel.findById(postId);
    if (!post) return null;

    let myStatus = LikeStatus.None;
    if (userId) {
      const like = await LikeForPostModel.findOne({ userId, postId });
      myStatus = like ? like.status : LikeStatus.None;
    }

    // Получаем 3 последних лайка
    const newestLikes = await LikeForPostModel
      .find({ postId, status: LikeStatus.Like })
      .sort({ addedAt: -1 })
      .limit(3)
      .lean();

    return {
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
      createdAt: post.createdAt,
      extendedLikesInfo: {
        likesCount: post.extendedLikesInfo.likesCount,
        dislikesCount: post.extendedLikesInfo.dislikesCount,
        myStatus,
        newestLikes: newestLikes.map(l => ({
          addedAt: l.addedAt,
          userId: l.userId,
          login: l.login
        }))
      }
    };
  }

  async getPostByBlogId(id: string, query: InputWithoutSearch): Promise<OutputTypeWithPagination<PostOutput>> {

    const skip = (query.pageSize * query.pageNumber) - query.pageSize;

    const sort = {[query.sortBy]: query.sortDirection}

    const posts = await PostModel
      .find({blogId: id})
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort)


    const totalCount = await PostModel.countDocuments({blogId: id});

    const paramsForFront = { //мазоль, которая идет во фронт
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalCount,
    }
    const postsForFront = posts.map(mapToPostViewModel)
    return finalPostMapper(postsForFront, paramsForFront);
  }
};





