import {commentsCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {CommentOutput} from "../types/main-types/comment-output.type";
import {mapToCommentViewModel} from "../mapper/map-to-comment-view-model";
import {CommentForPostInput} from "../types/main-types/comment-for-post-input.type";


export const commentsRepository = {
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
  },

  async deleteComment(id: string): Promise<void | null>  {
    const deletedComment = await commentsCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedComment.deletedCount < 1) {
      return null
    }
  },

  async createCommentForPost(comment: CommentForPostInput): Promise<CommentOutput | null> {
      const insertResult = await commentsCollection.insertOne(comment)
      if (!insertResult.acknowledged) return null;

      const newComment = await commentsCollection.findOne<WithId<CommentForPostInput>>(
        {_id: insertResult.insertedId}
      )
      if (!newComment) return null;

      return mapToCommentViewModel(newComment)
  }
}