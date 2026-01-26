import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {LikeStatus} from "../comments/enum/like-enum";

type LikeForPostType = {
  userId: string
  postId: string
  login: string
  status: LikeStatus
  addedAt: string
}

const LikesForPostSchema = new mongoose.Schema<LikeForPostType> ({
  userId: {type: String, required: true},
  postId: {type: String, required: true},
  status: {
    type: String,
    enum: Object.values(LikeStatus),
    required: true
  },
  addedAt: {type: String, required: true},
})

type LikeForPost = Model<LikeForPostType>

export type LikeDocument = HydratedDocument<LikeForPostType>

export const LikeForPostModel = model<LikeForPostType, LikeForPost>('likesForPosts', LikesForPostSchema)

