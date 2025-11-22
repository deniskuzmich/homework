import {ObjectId} from "mongodb";

export type CommentDbType = {
  content: string,
  commentatorInfo: {
    userId: ObjectId,
    userLogin: string
  },
  createdAt: string
}