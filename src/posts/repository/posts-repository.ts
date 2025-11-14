import {Post} from "../types/main-types/posts-db.type";
import {ObjectId, SortDirection, WithId} from "mongodb";
import {postsCollection} from "../../db/mongo.db";
import {PostInputDto} from "../types/main-types/post.input-dto";

export const postsRepository = {
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
