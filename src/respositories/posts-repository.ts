import {Post} from "../core/types/posts-types";
import {ObjectId, WithId} from "mongodb";
import {postsCollection} from "../db/mongo.db";
import {PostInputDto} from "../input-types/post.input-dto";

export const postsRepository = {
  async findPosts(): Promise<WithId<Post>[]> {
    return postsCollection.find().toArray()
  },
  async getPostById(id: string): Promise<WithId<Post> | null> {
    return postsCollection.findOne({_id: new ObjectId(id)});
  },
  async updatePost(id: string, newData: PostInputDto): Promise<void> {
    const updatedPost = await postsCollection.updateOne(
      {_id: new ObjectId(id)},
      {
        $set: {
          title: newData.title,
          shortDescription: newData.shortDescription,
          content: newData.content,
          blogId: newData.blogId
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
