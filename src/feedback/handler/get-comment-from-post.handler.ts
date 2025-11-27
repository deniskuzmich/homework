import {Request, Response} from "express";
import {commentsService} from "../service/comments.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";

export async function getCommentForPostHandler(req: Request, res: Response) {
  const query = req.query;
  const comment = await commentsService.getCommentByPostId(req.params.postId, query);
  if(comment.status === ResultStatus.NotFound) {
    return res.status(mapResultCodeToHttpExtension(comment.status)).send(comment.extensions)
  }
  res.status(mapResultCodeToHttpExtension(comment.status)).send(comment.data)
}