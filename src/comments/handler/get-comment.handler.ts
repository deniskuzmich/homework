import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {CommentsQueryRepository} from "../repository/comments-query.repository";
import {inject, injectable} from "inversify";

@injectable()
export class GetCommentByIdHandler {

  constructor(
    @inject(CommentsQueryRepository)
    public commentsQueryRepository: CommentsQueryRepository) {
  }

  async getCommentById(req: Request, res: Response) {
    const userId = req.user!.userId ?? null

    if(!userId) {
      const comment = await this.commentsQueryRepository.getCommentById(req.params.id);

      if (!comment) {
        return res.sendStatus(HttpStatuses.NotFound)
      }

      return res.status(HttpStatuses.Success).send(comment);
    }

    const commentWithLike = await this.commentsQueryRepository.getCommentWithLike(req.params.id, userId);

    if (!commentWithLike) {
      return res.sendStatus(HttpStatuses.NotFound)
    }

    return res.status(HttpStatuses.Success).send(commentWithLike);
  }
}

