import { Request, Response } from "express";
import { ResultStatus } from "../../common/types/result.status";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {mapToPostViewModel} from "../mapper/map-to-post-view-model";
import {postsService} from "../service/posts.service";

export async function postPostsHandler(req: Request <{},{}, PostInputDto>, res: Response) {
  try {
    const createdPost = await postsService.createPost(req.body);
    if (!createdPost) {
      return res.sendStatus(ResultStatus.BAD_REQUEST_400);
    }

    const postViewModel = mapToPostViewModel(createdPost)
    res.status(ResultStatus.CREATED_201).send(postViewModel);

  } catch (e: unknown) {
    res.status(ResultStatus.IntervalServerError);
  }
}
