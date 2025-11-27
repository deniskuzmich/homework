import {Request, Response} from "express";
import {commentsService} from "../service/comments.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {commentsQueryRepository} from "../repository/comments-query.repository";
import {usersService} from "../../users/service/users.service";

export async function updateCommentsHandler(req: Request, res: Response) {
  const commentId = req.params.commentId
  const content = req.body.content;
  const userId = req.params.userId;

  const comment = await commentsQueryRepository.getCommentById(commentId);
  if (!comment) {
    return res.sendStatus(HttpStatuses.NotFound);
  }
  const userDb = await usersService.getUserById(req.user!.userId)
  if (!userDb) {
    return res.sendStatus(HttpStatuses.NotFound);
  }

  if (comment.commentatorInfo.userId !== userDb._id.toString()) {
    return res.sendStatus(HttpStatuses.Forbidden)
  }

  const updatedComment = await commentsService.updateComment(commentId, content, userId);
  if (updatedComment.status !== ResultStatus.NoContent) {
    return res.status(mapResultCodeToHttpExtension(updatedComment.status)).send(updatedComment.extensions)
  }
  return res.sendStatus(mapResultCodeToHttpExtension(updatedComment.status));
}