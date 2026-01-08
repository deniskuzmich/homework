import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {CommentsService} from "../service/comments.service";


export class UpdateCommentsHandler {
  commentsService: CommentsService;

  constructor(commentsService: CommentsService) {
    this.commentsService = commentsService;
  }

  update = async (req: Request, res: Response) => {
    const commentId = req.params.commentId
    const content = req.body.content;
    const userId = req.user!.userId;

    const updatedComment = await this.commentsService.updateComment(commentId, content, userId);
    if (updatedComment.status !== ResultStatus.NoContent) {
      return res.status(mapResultCodeToHttpExtension(updatedComment.status)).send(updatedComment.extensions)
    }
    return res.sendStatus(mapResultCodeToHttpExtension(updatedComment.status));
  }
}

