import {PostOutput} from "../types/main-types/post-output.type";
import {PostDocument} from "../../entity/posts.entity";
import {LikeStatus} from "../../comments/enum/like-enum";


export function mapToPostViewModel(
  post: PostDocument,
  myStatus: LikeStatus = LikeStatus.None
): PostOutput {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId.toString(),
    blogName: post.blogName,
    createdAt: post.createdAt,
    extendedLikesInfo: {
      likesCount: post.extendedLikesInfo.likesCount,
      dislikesCount: post.extendedLikesInfo.dislikesCount,
      myStatus: myStatus,
      // Мапим массив последних лайков из документа
      newestLikes: post.extendedLikesInfo.newestLikes.map(l => ({
        addedAt: l.addedAt,
        userId: l.userId,
        login: l.login
      }))
    }
  }
}