import {Request, Response} from "express";
import {postsRepository} from "../../respositories/posts-repository";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";

export function postPostsHandler(req: Request, res: Response) {
  const newPost = postsRepository.createPost(req.body);
  res.status(HTTP_STATUSES.CREATED_201).send(newPost);
}