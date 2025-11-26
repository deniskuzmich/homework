import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {postsService} from "../service/posts.service";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function updatePostHanlder(
  req: Request<{ id: string }, {}, PostInputDto>,
  res: Response) {
  try {
    const post = await postsService.getPostById(req.params.id);

    if (!post) {
      return res.sendStatus(HttpStatuses.NotFound);
    }

    await postsService.updatePost(req.params.id, req.body);
    return res.sendStatus(HttpStatuses.NoContent);

  } catch (e: unknown) {
    return res.sendStatus(HttpStatuses.ServerError)
  }
}
