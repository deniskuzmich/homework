import {commentsCollection, postsCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {CommentForPostInput} from "../types/main-types/comment-for-post-input.type";
import {CommentDbType} from "../types/main-types/comment-db.type";

export class CommentsRepository {
  async getCommentById(postId: string): Promise<WithId<CommentDbType> | null> {
    return commentsCollection.findOne({_id: new ObjectId(postId)})
  }

  async getCommentByPostId(id: string): Promise<WithId<CommentDbType> | null> {
    const commentForPost = await commentsCollection.findOne({postId: new ObjectId(id)})
    if(!commentForPost) return null
    return commentForPost
  }

  async updateComment(id: string, newContent: string) {
    const updatedComment = await commentsCollection.updateOne(
      {_id: new ObjectId(id)},
      {
        $set: {
          content: newContent,
        }
      });
    if (updatedComment.matchedCount < 1) return false
    return  true
  }

  async deleteComment(id: string)  {
    const deletedComment = await commentsCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedComment.deletedCount < 1) {
      return null
    }
    return true
  }

  async createCommentForPost(comment: CommentDbType): Promise<WithId<CommentDbType> | null> {
      const insertResult = await commentsCollection.insertOne(comment)
      if (!insertResult.acknowledged) return null;

      const newComment = await commentsCollection.findOne<WithId<CommentForPostInput>>(
        {_id: insertResult.insertedId}
      )
      if (!newComment) return null;
      return newComment
  }
}

