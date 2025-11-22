import {CommentDbType} from "../types/main-types/comment-db.type";
import {WithId} from "mongodb";
import {CommentOutput} from "../types/main-types/comment-output.type";

export function mapToCommentViewModel (comment: WithId<CommentDbType>): CommentOutput {
  return {
    id: comment._id.toString(),
    content: comment.content,
    commentatorInfo: {
      userId: comment.commentatorInfo.userId.toString(),
      userLogin: comment.commentatorInfo.userLogin,
    },
    createdAt: comment.createdAt
  }
}