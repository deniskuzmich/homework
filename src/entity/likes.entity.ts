import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {LikeStatus} from "../comments/enum/like-enum";

type Like = {
  commentId: string;
  userId: string;
  myStatus: LikeStatus;
}

const LikesSchema = new mongoose.Schema<Like> ({
  commentId: {type: String},
  userId: {type: String},
  myStatus: {
    type: String,
    enum: Object.values(LikeStatus),
    default: LikeStatus.None
  },
})

type LikeModel = Model<Like>

export type LikeDocument = HydratedDocument<Like>

export const LikeModel = model<Like, LikeModel>('likes', LikesSchema)

