import { Request, Response } from "express";
import { ResultStatus } from "../../common/types/result.status";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {mapToPostViewModel} from "../mapper/map-to-post-view-model";
import {postsService} from "../service/posts.service";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function postPostsHandler(req: Request <{},{}, PostInputDto>, res: Response) {
  try {
    const createdPost = await postsService.createPost(req.body);
    if (!createdPost) {
      return res.sendStatus(HttpStatuses.BadRequest);
    }

    const postViewModel = mapToPostViewModel(createdPost)
    res.status(HttpStatuses.Created).send(postViewModel);

  } catch (e: unknown) {
    res.status(HttpStatuses.ServerError);
  }
}
