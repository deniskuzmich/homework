import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {CommentDbType} from "../comments/types/main-types/comment-db.type";
import {LikeStatus} from "../comments/enum/like-enum";

const CommentsSchema = new mongoose.Schema<CommentDbType> ({
  content: {type: String, required: true},
  commentatorInfo: {
    userId: {type: String, required: true},
    userLogin: {type: String, required: true},
  },
  createdAt: {type: Date},
  likesInfo: {
    likesCount: {type: Number, default: 0},
    dislikesCount: {type: Number, default: 0},
  }
})

type CommentModel = Model<CommentDbType>

export type CommentDocument = HydratedDocument<CommentDbType>

export const CommentModel = model<CommentDbType, CommentModel>('comments', CommentsSchema);