import {commentsCollection} from "../../db/mongo.db";
import {ObjectId} from "mongodb";

export const commentsQueryRepository = {
  async getCommentById(id: string) {
    const comment = await commentsCollection.find({userId: new ObjectId(id)})
    

  }
}