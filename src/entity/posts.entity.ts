import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {Post} from "../posts/types/main-types/posts-db.type";
import {PostInputDto} from "../posts/types/main-types/post.input-dto";
import {BlogDocument} from "./blogs.entity";
import {PostInputDtoForBlog} from "../posts/types/input-types/input-dto-pagination-for-blog.type";


const PostSchema = new mongoose.Schema<Post>({
  title: {type: String, required: true},
  shortDescription: {type: String, required: true},
  content: {type: String, required: true},
  blogId: {type: String, required: true},
  blogName: {type: String, required: true},
  createdAt: {type: String, required: true},
  extendedLikesInfo: {
  likesCount: {type: Number},
    dislikesCount: {type: Number},
    newestLikes: [{
    addedAt: {type: String},
    userId: {type: String},
    login: {type: String}
  }]
}
})

export type PostDocument = HydratedDocument<Post, PostMethods> & { id: string };

interface PostStatic {
  createPost(blog: BlogDocument, newData: PostInputDto): PostDocument
  createPostForBlog(blog: BlogDocument, inputInfo: PostInputDtoForBlog): PostDocument
}

interface PostMethods {
  updatePost(newData: PostInputDto): boolean
}

type PostModel = Model<Post, {}, PostMethods, {}, PostDocument> & PostStatic

class PostEntity {
  private constructor(
    public title: string,
    public shortDescription: string,
    public content: string,
    public blogId: string,
    public blogName: string,
    public createdAt: string,
    public extendedLikesInfo: {
    likesCount: number,
    dislikesCount: number,
    newestLikes: [{
      addedAt: string,
      userId: string,
      login: string
    }]
  }
  ) {
  }

  static createPost(blog: BlogDocument, newData: PostInputDto): PostDocument {
    const newPost = new PostModel()
    newPost.title = newData.title;
    newPost.shortDescription = newData.shortDescription;
    newPost.content = newData.content;
    newPost.blogId = blog.id;
    newPost.blogName = blog.name;
    newPost.createdAt = new Date().toISOString();
    newPost.extendedLikesInfo = {
        likesCount: 0,
        dislikesCount: 0,
        newestLikes: [{
          addedAt: new Date().toISOString(),
          userId: newData.userId!,
          login: newData.login!
      }]
    }

    return newPost
  }

  updatePost(this: PostDocument, newData: PostInputDto): boolean {
      this.title = newData.title,
      this.shortDescription = newData.shortDescription,
      this.content = newData.content,
      this.blogId = newData.blogId

    return true
  }

  static createPostForBlog(blog: BlogDocument, inputInfo: PostInputDtoForBlog): PostDocument {
    const newPostByBlogId = new PostModel({
      title: inputInfo.title,
      shortDescription: inputInfo.shortDescription,
      content: inputInfo.content,
      blogId: blog._id,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        newestLikes: [{
          addedAt: new Date().toISOString(),
          userId: inputInfo.userId,
          login: inputInfo.login
        }]
      }
    })

    return newPostByBlogId
  }
}

PostSchema.loadClass(PostEntity)
export const PostModel = model<Post, PostModel>('posts', PostSchema);
