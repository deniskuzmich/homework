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
  async findPosts(query: InputPaginationForRepo, userId: string | null): Promise<OutputTypeWithPagination<PostOutput>> {
    const skip = (query.pageSize * query.pageNumber) - query.pageSize;
    const sort = { [query.sortBy]: query.sortDirection };

    // 1. Получаем посты с пагинацией и сортировкой
    const posts = await PostModel.find().skip(skip).limit(query.pageSize).sort(sort);
    const totalCount = await PostModel.countDocuments();

    const postIds = posts.map(p => p._id.toString());

    // 2. Получаем лайки текущего пользователя для всех постов на странице
    const likesMap = new Map<string, LikeStatus>();
    if (userId) {
      const userLikes = await LikeForPostModel.find({
        userId,
        postId: { $in: postIds },
      });
      userLikes.forEach(like => likesMap.set(like.postId, like.status));
    }

    // 3. Получаем топ-3 newestLikes для всех постов
    const newestLikesMap = new Map<string, { addedAt: string; userId: string; login: string }[]>();
    const allLikes = await LikeForPostModel.find({
      postId: { $in: postIds },
      status: LikeStatus.Like,
    }).sort({ addedAt: -1 });

    for (const like of allLikes) {
      if (!newestLikesMap.has(like.postId)) newestLikesMap.set(like.postId, []);
      const arr = newestLikesMap.get(like.postId)!;
      if (arr.length < 3) {
        arr.push({ addedAt: like.addedAt, userId: like.userId, login: like.login });
      }
    }

    // 4. Мапим посты на фронт
    const postsForFront: PostOutput[] = posts.map(p => {
      const myStatus = likesMap.get(p._id.toString()) ?? LikeStatus.None;
      const newestLikes = newestLikesMap.get(p._id.toString()) ?? [];

      return {
        id: p._id.toString(),
        title: p.title,
        shortDescription: p.shortDescription,
        content: p.content,
        blogId: p.blogId,
        blogName: p.blogName,
        createdAt: p.createdAt,
        extendedLikesInfo: {
          likesCount: p.extendedLikesInfo.likesCount,
          dislikesCount: p.extendedLikesInfo.dislikesCount,
          myStatus,
          newestLikes,
        },
      };
    });

    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: postsForFront,
    };
  }

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

  async getPostByBlogId(
    blogId: string,
    query: InputWithoutSearch,
    userId: string | null // Добавили userId
  ): Promise<OutputTypeWithPagination<PostOutput>> {

    const skip = (query.pageSize * query.pageNumber) - query.pageSize;
    const sort = { [query.sortBy]: query.sortDirection };

    // 1. Ищем посты конкретного блога
    const posts = await PostModel
      .find({ blogId: blogId })
      .skip(skip)
      .limit(query.pageSize)
      .sort(sort);

    const totalCount = await PostModel.countDocuments({ blogId: blogId });

    // 2. Оптимизация: получаем статусы лайков юзера для всех найденных постов
    const postIds = posts.map(p => p._id.toString());
    let likesMap = new Map<string, LikeStatus>();

    if (userId && postIds.length > 0) {
      const likes = await LikeForPostModel.find({
        userId,
        postId: { $in: postIds }
      });
      likes.forEach(l => likesMap.set(l.postId, l.status));
    }

    // 3. Мапим посты с учетом myStatus
    const postsForFront = posts.map(p => {
      const myStatus = likesMap.get(p._id.toString()) ?? LikeStatus.None;
      return mapToPostViewModel(p, myStatus);
    });

    // 4. Возвращаем результат (убираем лишние переменные для чистоты)
    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalCount,
      items: postsForFront
    };
  }
};





