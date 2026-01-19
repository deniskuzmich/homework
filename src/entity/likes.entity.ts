import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {LikeStatus} from "../comments/enum/like-enum";

type Like = {
  userId: string
  commentId: string
  status: LikeStatus
}

const LikesSchema = new mongoose.Schema<Like> ({
  // userId: {type: String, required: true},
  // commentId: {type: String, required: true},
  status: {
    type: String,
    enum: Object.values(LikeStatus),
    required: true
  }
})

type LikeModel = Model<Like>

export type LikeDocument = HydratedDocument<Like>

export const LikeModel = model<Like, LikeModel>('likes', LikesSchema)

