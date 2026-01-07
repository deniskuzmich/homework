import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {commentsService} from "../../core/composition/composition-root";

export class UpdateCommentsHandler {
  async update (req: Request, res: Response) {
    const commentId = req.params.commentId
    const content = req.body.content;
    const userId = req.user!.userId;

    const updatedComment = await commentsService.updateComment(commentId, content, userId);
    if (updatedComment.status !== ResultStatus.NoContent) {
      return res.status(mapResultCodeToHttpExtension(updatedComment.status)).send(updatedComment.extensions)
    }
    return res.sendStatus(mapResultCodeToHttpExtension(updatedComment.status));
  }
}

