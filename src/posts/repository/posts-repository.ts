import {Post} from "../types/main-types/posts-db.type";
import {ObjectId, WithId} from "mongodb";
import {postsCollection} from "../../db/mongo.db";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {BlogInputWithoutSearch} from "../../blogs/types/input-types/blog-input-without-search";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {PostOutput} from "../types/main-types/post-output.type";
import {mapToPostViewModel} from "../mapper/map-to-post-view-model";
import {finalPostMapper} from "../mapper/final-post-map";

export const postsRepository = {
  async getPostByBlogId(id: string): Promise<WithId<Post> | null> {

    const post = await postsCollection.findOne({blogId: new ObjectId(id)})
    if(!post) return null
    return post
  },
  async updatePost(id: string, newData: PostInputDto): Promise<void> {
    const updatedPost = await postsCollection.updateOne(
      {_id: new ObjectId(id)},
      {
        $set: {
          title: newData.title,
          shortDescription: newData.shortDescription,
          content: newData.content,
          blogId: new ObjectId(newData.blogId)
        }
      }
    );
    if (updatedPost.matchedCount < 1) {
      throw new Error("Post not exist")
    }
    return
  },
  async createPost(newPost: Post): Promise<WithId<Post>> {
    const insertResult = await postsCollection.insertOne(newPost);
    return {...newPost, _id: insertResult.insertedId};
  },
  async deletePost(id: string) {
    const deletedPost = await postsCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedPost.deletedCount < 1) {
      throw new Error("Post not exist")
    }
  },
};
