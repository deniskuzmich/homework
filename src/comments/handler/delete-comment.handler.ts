import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {commentsService} from "../../core/composition/composition-root";


export class DeleteCommentHandler {
  async delete(req: Request, res: Response) {
    const commentId = req.params.commentId;
    const userId = req.user!.userId

    const deletedComment = await commentsService.deleteComment(commentId, userId);
    if(deletedComment.status !== ResultStatus.NoContent) {
      return res.sendStatus(mapResultCodeToHttpExtension(deletedComment.status))
    }
    return res.sendStatus(mapResultCodeToHttpExtension(deletedComment.status));
  }
}

