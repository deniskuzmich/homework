import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {Blog} from "../blogs/types/main-types/blog-db.type";

const BlogSchema = new mongoose.Schema<Blog>({
  name: {type: String, required: true},
  description: {type: String, required: true},
  websiteUrl: {type: String, required: true},
  createdAt: {type: String, required: true},
  isMembership: {type: Boolean, default: false}
})

type BlogModel = Model<Blog>

export type BlogDocument = HydratedDocument<Blog>

export const BlogModel = model<Blog, BlogModel>('blogs', BlogSchema);
