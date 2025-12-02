import { Request, Response } from "express";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {postsService} from "../service/posts.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {postsQueryRepository} from "../repository/posts-query-repository";

export async function postPostsHandler(req: Request <{},{}, PostInputDto>, res: Response) {
  try {
    const createdPost = await postsService.createPost(req.body);
    if (!createdPost) {
      return res.sendStatus(HttpStatuses.BadRequest);
    }

    const postViewModel = await postsQueryRepository.getPostById(createdPost._id.toString())
    res.status(HttpStatuses.Created).send(postViewModel);

  } catch (e: unknown) {
    res.status(HttpStatuses.ServerError);
  }
}
