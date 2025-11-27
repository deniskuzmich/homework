import {Request, Response} from "express";
import {commentsService} from "../service/comments.service";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";


export async function deleteCommentHandler(req: Request, res: Response) {

  const deletedComment = await commentsService.getCommentById(req.params.id);
  if(deletedComment.status !== ResultStatus.NoContent) {
    return res.status(mapResultCodeToHttpExtension(deletedComment.status))
  }

  await commentsService.deleteComment(req.params.id);
  return res.sendStatus(mapResultCodeToHttpExtension(deletedComment.status));
}