import {Request, Response} from "express";
import {commentsService} from "../service/comments.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {commentsQueryRepository} from "../repository/comments-query.repository";
import {usersService} from "../../users/service/users.service";

export async function updateCommentsHandler(req: Request, res: Response) {

  const comment = await commentsQueryRepository.getCommentById(req.params.commentId);
  if (!comment) {
    return
  }

  const userDb = await usersService.getUserById(req.user!.userId)
  if (!userDb) {
    return res.sendStatus(HttpStatuses.NotFound);
  }

  if (comment.commentatorInfo.userId !== userDb._id.toString()) {
    return res.sendStatus(HttpStatuses.Forbidden)
  }

  const updatedComment = await commentsService.updateComment(req.params.commentId, req.body.content);
  if (updatedComment.status !== ResultStatus.NoContent) {
    return res.status(mapResultCodeToHttpExtension(updatedComment.status)).send(updatedComment.extensions)
  }
  res.sendStatus(HttpStatuses.NoContent);
}