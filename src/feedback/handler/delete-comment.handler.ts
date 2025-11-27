import {Request, Response} from "express";
import {commentsService} from "../service/comments.service";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";


export async function deleteCommentHandler(req: Request, res: Response) {
  const commentId = req.params.commentId;
  const userId = req.user!.userId


  const deletedComment = await commentsService.deleteComment(commentId, userId);
  if(deletedComment.status !== ResultStatus.NoContent) {
    return res.sendStatus(mapResultCodeToHttpExtension(deletedComment.status))
  }

  return res.sendStatus(mapResultCodeToHttpExtension(deletedComment.status));
}