import {LikeStatus} from "../../enum/like-enum";

export type CommentDbType = {
  content: string,
  commentatorInfo: {
    userId: string,
    userLogin: string
  },
  createdAt: string,
  likesInfo: {
    likesCount: number,
    dislikesCount: number,
    myStatus: LikeStatus
  }
}