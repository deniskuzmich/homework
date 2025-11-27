import {Request, Response} from "express";
import {commentsService} from "../service/comments.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";

export async function getCommentForPostHandler(req: Request, res: Response) {
  const query = req.query;
  const postId = req.params.id;

  const commentForPost = await commentsService.getCommentByPostId(postId, query);
  if(commentForPost.status === ResultStatus.NotFound) {
    return res.status(mapResultCodeToHttpExtension(commentForPost.status)).send(commentForPost.extensions)
  }
  return res.status(mapResultCodeToHttpExtension(commentForPost.status)).send(commentForPost.data)
}