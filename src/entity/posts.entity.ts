import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {Post} from "../posts/types/main-types/posts-db.type";


const PostSchema = new mongoose.Schema<Post>({
  title: {type: String, required: true},
  shortDescription: {type: String, required: true},
  content: {type: String, required: true},
  blogId: {type: String, required: true},
  blogName: {type: String, required: true},
  createdAt: {type: String, required: true},
})

type PostModel = Model<Post>

export type PostDocument = HydratedDocument<Post>

export const PostModel = model<Post, PostModel>('posts', PostSchema);
