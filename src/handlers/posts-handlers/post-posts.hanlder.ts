import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../core/http_statuses/http_statuses";
import {PostInputDto} from "../../input-types/posts-input-type/post.input-dto";
import {mapToPostViewModel} from "../../mappers/posts-mappers/map-to-post-view-model";
import {postsService} from "../../application/posts.service";

export async function postPostsHandler(req: Request <{},{}, PostInputDto>, res: Response) {
  try {
    const createdPost = await postsService.createPost(req.body);
    if (!createdPost) {
      return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }

    const postViewModel = mapToPostViewModel(createdPost)
    res.status(HTTP_STATUSES.CREATED_201).send(postViewModel);

  } catch (e: unknown) {
    res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
  }
}
