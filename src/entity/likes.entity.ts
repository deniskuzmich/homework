import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";

type Like = {
  likesCount: number,
  dislikesCount: number,
  myStatus: string
}

const LikesSchema = new mongoose.Schema<Like> ({
  likesCount: {type: Number},
  dislikesCount: {type: Number},
  myStatus: {type: String},
})

type LikeModel = Model<Like>

export type LikeDocument = HydratedDocument<Like>

export const LikeModel = model<Like, LikeModel>('likes', LikesSchema)

