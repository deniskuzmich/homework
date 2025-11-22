import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {postsService} from "../service/posts.service";

export async function deletePostHanlder(req: Request, res: Response) {
  try {
    const post = await postsService.getPostById(req.params.id);

    if (!post) {
      res.sendStatus(ResultStatus.NotFound);
    }

    await postsService.deletePost(req.params.id);
    return res.sendStatus(ResultStatus.NoContent);

  } catch (e: unknown) {
    res.sendStatus(ResultStatus.IntervalServerError);
  }
}

