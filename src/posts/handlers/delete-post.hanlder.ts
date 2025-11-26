import {Request, Response} from "express";
import {postsService} from "../service/posts.service";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function deletePostHanlder(req: Request, res: Response) {
  try {
    const post = await postsService.getPostById(req.params.id);

    if (!post) {
      res.sendStatus(HttpStatuses.NotFound);
    }

    await postsService.deletePost(req.params.id);
    return res.sendStatus(HttpStatuses.NoContent);

  } catch (e: unknown) {
    res.sendStatus(HttpStatuses.ServerError);
  }
}

