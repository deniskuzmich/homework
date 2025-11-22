import {commentsCollection} from "../../db/mongo.db";
import {ObjectId} from "mongodb";
import {mapToCommentViewModel} from "../mapper/map-to-comment-view-model";
import {CommentOutput} from "../types/main-types/comment-output.type";

export const commentsQueryRepository = {
  async getCommentById(id: string): Promise<CommentOutput | null> {
    const comment = await commentsCollection.findOne({_id: new ObjectId(id)})

    if (!comment) {
      return null;
    }
    return mapToCommentViewModel(comment)
  }
}