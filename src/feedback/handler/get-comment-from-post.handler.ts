import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {commentsQueryRepository} from "../repository/comments-query.repository";
import {valuesPaginationMaperAsc} from "../mapper/query-validation-maper";

export async function getCommentForPostHandler(req: Request, res: Response) {
  const postId = req.params.id;
  const query = valuesPaginationMaperAsc(req.query);

  const commentForPost = await commentsQueryRepository.getCommentByPostIdWithPagination(postId, query);
  if(!commentForPost) {
    return res.sendStatus(HttpStatuses.NotFound)
  }
  return res.status(HttpStatuses.Success).send(commentForPost)
}