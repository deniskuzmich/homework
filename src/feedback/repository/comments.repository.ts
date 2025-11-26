import {commentsCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {UserInfoType} from "../../users/types/output-types/user-info.type";
import {CommentDbType} from "../types/main-types/comment-db.type";
import {CommentOutput} from "../types/main-types/comment-output.type";
import {mapToCommentViewModel} from "../mapper/map-to-comment-view-model";


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
  },

  async deleteComment(id: string)  {
    const deletedComment = await commentsCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedComment.deletedCount < 1) {
      return null
    }
  },

  async createCommentForPost(comment: CommentDbType): Promise<CommentOutput> {
      const insertResult = await commentsCollection.insertOne(comment)
      const commentWithId = {
      ...comment,
        _id: insertResult.insertedId
      }
      return mapToCommentViewModel(commentWithId)
  }
}