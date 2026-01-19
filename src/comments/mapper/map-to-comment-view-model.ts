import {CommentOutput} from "../types/main-types/comment-output.type";
import {CommentDocument} from "../../entity/comments.entity";
import {LikeStatus} from "../enum/like-enum";

export function mapToCommentViewModel (data:CommentDocument): CommentOutput {

  return {
    id: data._id.toString(),
    content: data.content,
    commentatorInfo: {
      userId: data.commentatorInfo.userId.toString(),
      userLogin: data.commentatorInfo.userLogin,
    },
    createdAt: data.createdAt,
    likesInfo: {
      likesCount: data.likesInfo.likesCount,
      dislikesCount: data.likesInfo.dislikesCount,
      myStatus: data.likesInfo.myStatus
    }
  }
  // return {
  //   id: data._id.toString(),
  //   content: data.content,
  //   commentatorInfo: {
  //     userId: data.commentatorInfo.userId.toString(),
  //     userLogin: data.commentatorInfo.userLogin,
  //   },
  //   createdAt: data.createdAt,
  //   likesInfo: {
  //     likesCount: data.likesInfo.likesCount,
  //     dislikesCount: data.likesInfo.dislikesCount,
  //     myStatus: myStatus
  //   }
  // }
}