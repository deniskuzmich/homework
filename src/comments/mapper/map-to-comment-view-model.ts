import {CommentDocument} from "../../entity/comments.entity";
import {LikeStatus} from "../enum/like-enum";
import {CommentOutput} from "../types/main-types/comment-output.type";


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
      myStatus: LikeStatus.None
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