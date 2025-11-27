import {ObjectId} from "mongodb";

export type CommentDbType = {
  content: string,
  commentatorInfo: {
    userId: string,
    userLogin: string
  },
  createdAt: string
}