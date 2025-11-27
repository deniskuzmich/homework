import {CommentDbType} from "../types/main-types/comment-db.type";
import {WithId} from "mongodb";
import {CommentOutput} from "../types/main-types/comment-output.type";

export function mapToCommentViewModel (data: WithId<CommentDbType>): CommentOutput {
  return {
    id: data._id.toString(),
    content: data.content,
    commentatorInfo: {
      userId: data.userId.toString(),
      userLogin: data.userLogin,
    },
    createdAt: data.createdAt
  }
}