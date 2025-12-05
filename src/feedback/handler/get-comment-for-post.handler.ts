// import {Request, Response} from "express";
// import {HttpStatuses} from "../../common/types/http-statuses";
// import {commentsQueryRepository} from "../repository/comments-query.repository";
// import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
// import {postsService} from "../../posts/service/posts.service";
//
// export async function getCommentForPostHandler(req: Request, res: Response) {
//   const id = req.params.id;
//   const query = valuesPaginationMaper(req.query);
//
//   const post = await postsService.getPostById(id);
//   if (!post) {
//     return res.sendStatus(HttpStatuses.NotFound)
//   }
//
//   const commentForPost = await commentsQueryRepository.getCommentByPostIdWithPagination(post._id.toString(), query);
//
//   if(!commentForPost) {
//     return res.sendStatus(HttpStatuses.NotFound)
//   }
//   return res.status(HttpStatuses.Success).send(commentForPost)
// }

import {Request, Response} from "express";
import {commentsService} from "../service/comments.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";

export async function getCommentForPostHandler(req: Request, res: Response) {
  const query = req.query;
  const postId = req.params.id;

  const commentForPost = await commentsService.getCommentByPostId(postId,query);
  if(commentForPost.status === ResultStatus.NotFound) {
    return res.status(mapResultCodeToHttpExtension(commentForPost.status)).send(commentForPost.extensions)
  }
  return res.status(mapResultCodeToHttpExtension(commentForPost.status)).send(commentForPost.data)
}