import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {CommentsService} from "../service/comments.service";
import {inject, injectable} from "inversify";

@injectable()
export class DeleteCommentHandler {

  constructor(
    @inject(CommentsService)
    public commentsService: CommentsService) {
  }

  delete = async (req: Request, res: Response) => {
    const commentId = req.params.commentId;
    const userId = req.user!.userId

    const deletedComment = await this.commentsService.deleteComment(commentId, userId);
    if (deletedComment.status !== ResultStatus.NoContent) {
      return res.sendStatus(mapResultCodeToHttpExtension(deletedComment.status))
    }
    return res.sendStatus(mapResultCodeToHttpExtension(deletedComment.status));
  }
}

