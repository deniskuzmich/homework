import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {CommentsService} from "../service/comments.service";
import {inject, injectable} from "inversify";

@injectable()
export class UpdateCommentsHandler {

  constructor(
    @inject(CommentsService)
    public commentsService: CommentsService) {
  }

  async update(req: Request, res: Response) {
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

