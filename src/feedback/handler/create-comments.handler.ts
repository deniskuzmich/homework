import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {commentsService} from "../service/comments.service";

// export async function createCommentsHandler (req: Request, res: Response) {
//   const newComment = await commentsService.createComment(req.body.comment, req.user!._id);
//   res.status(HTTP_STATUSES.OK_200).send(newComment);
// }