import {Request, Response} from "express";
import {CommentsService} from "../service/comments.service";
import {inject, injectable} from "inversify";


@injectable()
export class LikeHandler {

  constructor(
    @inject(CommentsService)
    public commentsService: CommentsService) {
  }

  async likeStatus(req: Request, res: Response) {
    const commentId = req.params.commentId;
  }
}