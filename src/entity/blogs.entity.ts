import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {Blog} from "../blogs/types/main-types/blog-db.type";
import {BlogInputDto} from "../blogs/types/input-types/blog.input-dto";

const BlogSchema = new mongoose.Schema<Blog>({
  name: {type: String, required: true},
  description: {type: String, required: true},
  websiteUrl: {type: String, required: true},
  createdAt: {type: String, required: true},
  isMembership: {type: Boolean, default: false}
})

export type BlogDocument = HydratedDocument<Blog, BlogMethods> & { id: string }
export type BlogNewDocument = HydratedDocument<Blog, BlogMethods>

interface BlogStatics {
  createBlog(newBlog: BlogInputDto): BlogNewDocument;
}

interface BlogMethods {
  updateBlog(newData: BlogInputDto): boolean;
}

type BlogModel = Model<Blog, {}, BlogMethods, {}, BlogDocument> & BlogStatics

class BlogEntity {
  private constructor(
    public name: string,
    public description: string,
    public websiteUrl: string,
    public createdAt: string,
    public isMembership: boolean
  ) {
  }

  static createBlog(newData: BlogInputDto): BlogNewDocument {
    const newBlog = new BlogModel({
      name: newData.name,
      description: newData.description,
      websiteUrl: newData.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    })

    return newBlog;
  }

  updateBlog(this: BlogDocument, newData: BlogInputDto): boolean {
    this.name = newData.name;
    this.description = newData.description;
    this.websiteUrl = newData.websiteUrl;

    return true
  }
}

BlogSchema.loadClass(BlogEntity)

export const BlogModel = model<Blog, BlogModel>('blogs', BlogSchema);

