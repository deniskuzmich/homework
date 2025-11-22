import {commentsCollection} from "../../db/mongo.db";
import {ObjectId} from "mongodb";

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
  }
}