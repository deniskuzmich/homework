import {Request, Response} from "express";
import {postsRepository} from "../../respositories/posts-repository";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";
import {PostInputDto} from "../../input-types/post.input-dto";

export async function updatePostHanlder(
  req: Request<{ id: string }, {}, PostInputDto>,
  res: Response) {
  try {
    const post = postsRepository.getPostById(req.params.id);

    if (!post) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    await postsRepository.updatePost(req.params.id, req.body);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);

  } catch (e: unknown) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}
