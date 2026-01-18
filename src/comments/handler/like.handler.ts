import {Request, Response} from "express";
import {CommentsService} from "../service/comments.service";
import {inject, injectable} from "inversify";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";



@injectable()
export class LikeHandler {

  constructor(
    @inject(CommentsService)
    public commentsService: CommentsService) {
  }

  async updateLikeStatus(req: Request, res: Response) {
    const commentId = req.params.commentId;
    const likeStatus = req.body.likeStatus;
    // const userId = req.user!.userId;

    const result = await this.commentsService.updateLikeForComment(commentId, likeStatus)

    if(result.status === ResultStatus.Success)  {
      return res.status(mapResultCodeToHttpExtension(result.status)).send(result.extensions)
    }

    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
}