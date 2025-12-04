import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {commentsQueryRepository} from "../repository/comments-query.repository";
import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
import {postsRepository} from "../../posts/repository/posts-repository";

export async function getCommentForPostHandler(req: Request, res: Response) {
  const id = req.params.id;
  const query = valuesPaginationMaper(req.query);

  const post = await postsRepository.getPostById(id);
  if (!post) {
    return res.sendStatus(HttpStatuses.NotFound)
  }

  const commentForPost = await commentsQueryRepository.getCommentByPostIdWithPagination(post._id.toString(), query);
  if(!commentForPost) {
    return res.sendStatus(HttpStatuses.NotFound)
  }
  return res.status(HttpStatuses.Success).send(commentForPost)
}