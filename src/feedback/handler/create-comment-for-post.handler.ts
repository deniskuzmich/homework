import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {commentsService} from "../service/comments.service";
import {commentsQueryRepository} from "../repository/comments-query.repository";

export async function createCommentForPostHandler(req: Request, res: Response) {
  const user = req.user
  const content = req.body.content
  const postId = req.params.id;


  if (!content || !user) {
    return res.sendStatus(HttpStatuses.BadRequest);
  }
  if (!postId) {
    return res.sendStatus(HttpStatuses.NotFound)
  }

  const createdComment = await commentsService.createCommentForPost(user, content, postId)
  if (createdComment.status !== ResultStatus.Created) {
    return res.status(mapResultCodeToHttpExtension(createdComment.status)).send(createdComment.extensions)
  }

  const commentForPost = await commentsQueryRepository.getCommentByPostId(createdComment.data!.postId)

  // return res.status(mapResultCodeToHttpExtension(createdComment.status)).send(commentForPost)
  return res.status(HttpStatuses.Created).send(commentForPost)
}