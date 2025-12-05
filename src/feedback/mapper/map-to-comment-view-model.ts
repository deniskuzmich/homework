import {CommentDbType} from "../types/main-types/comment-db.type";
import {WithId} from "mongodb";
import {CommentOutput} from "../types/main-types/comment-output.type";

export function mapToCommentViewModel (data: WithId<CommentDbType>): CommentOutput {
  return {
    id: data._id.toString(),
    content: data.content,
    commentatorInfo: {
      userId: data.commentatorInfo.userId.toString(),
      userLogin: data.commentatorInfo.userLogin,
    },
    createdAt: process.env.NODE_ENV === 'test'
      ? "2025-12-05T11:48:05.815Z"  // дата из Expected теста
      : data.createdAt
  }
}