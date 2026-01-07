import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {commentsQueryRepository} from "../../core/composition/composition-root";


export class GetCommentByIdHandler {
  async getCommentById(req: Request, res: Response) {
    const comment = await commentsQueryRepository.getCommentById(req.params.id);

    if(!comment) {
      return res.sendStatus(HttpStatuses.NotFound)
    }
    res.status(HttpStatuses.Success).send(comment);
  }
}

