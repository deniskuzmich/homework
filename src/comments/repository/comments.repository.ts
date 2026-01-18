import {injectable} from "inversify";
import {CommentDocument, CommentModel} from "../../entity/comments.entity";


@injectable()
export class CommentsRepository {
  async save(comment: CommentDocument): Promise<CommentDocument> {
    await comment.save()
    return comment
  }
  async getCommentById(postId: string): Promise<CommentDocument | null> {
    return CommentModel.findOne({_id: postId})
  }

  async deleteComment(id: string)  {
    const deletedComment = await CommentModel.deleteOne({_id: id});
    if (deletedComment.deletedCount < 1) {
      return null
    }
    return true
  }
}

