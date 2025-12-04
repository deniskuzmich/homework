import {Request, Response} from "express";
import {commentsQueryRepository} from "../repository/comments-query.repository";
import {HttpStatuses} from "../../common/types/http-statuses";


export async function getCommentByIdHandler (req: Request, res: Response) {
  const comment = await commentsQueryRepository.getCommentById(req.params.id);

  if(!comment) {
    return res.sendStatus(HttpStatuses.NotFound)
  }
  res.status(HttpStatuses.Success).send(comment);
}