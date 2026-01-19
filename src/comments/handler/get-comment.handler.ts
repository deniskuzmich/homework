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
    const userId = req.user?.userId ?? null
    const comment = await this.commentsQueryRepository.getCommentWithLike(req.params.id, userId);

    if (!comment) {
      return res.sendStatus(HttpStatuses.NotFound)
    }
    res.status(HttpStatuses.Success).send(comment);
  }
}

