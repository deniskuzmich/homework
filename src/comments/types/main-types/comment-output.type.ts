import {LikeStatus} from "../../enum/like-enum";

export type CommentOutput = {
  id: string,
  content: string,
  commentatorInfo: {
    userId: string,
    userLogin: string
  },
  createdAt: Date,
  likesInfo: {
    likesCount: number,
    dislikesCount: number,
    // myStatus: LikeStatus
  }
}