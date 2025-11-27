import {Request, Response} from "express";
import {commentsService} from "../service/comments.service";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";

export async function updateCommentsHandler(req: Request, res: Response) {
  const commentId = req.params.commentId
  const content = req.body.content;
  const userId = req.user!.userId;

  const updatedComment = await commentsService.updateComment(commentId, content, userId);
  if (updatedComment.status !== ResultStatus.NoContent) {
    return res.status(mapResultCodeToHttpExtension(updatedComment.status)).send(updatedComment.extensions)
  }
  return res.sendStatus(mapResultCodeToHttpExtension(updatedComment.status));
}