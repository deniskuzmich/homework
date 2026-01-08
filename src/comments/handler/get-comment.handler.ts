import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {CommentsQueryRepository} from "../repository/comments-query.repository";


export class GetCommentByIdHandler {
  commentsQueryRepository: CommentsQueryRepository;

  constructor(commentsQueryRepository: CommentsQueryRepository) {
    this.commentsQueryRepository = commentsQueryRepository;
  }

  getCommentById = async (req: Request, res: Response) => {
    const comment = await this.commentsQueryRepository.getCommentById(req.params.id);

    if (!comment) {
      return res.sendStatus(HttpStatuses.NotFound)
    }
    res.status(HttpStatuses.Success).send(comment);
  }
}

