import { Request, Response } from "express";
import { postsRepository } from "../../respositories/posts-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";
import {db} from "../../db/in-memory.db.";
import {Post} from "../../core/types/posts-types";
import {PostInputDto} from "../../input-types/post.input-dto";

export function postPostsHandler(req: Request <{},{}, PostInputDto>, res: Response) {
const blog = db.blogs.find((b) => b.id === req.body.blogId);
if (!blog) return null;

const newPost: Post = {
  id: (db.posts.length ? db.posts[db.posts.length - 1].id + 1 : 1).toString(),
  title: req.body.title,
  shortDescription: req.body.shortDescription,
  content: req.body.content,
  blogId: req.body.blogId,
  blogName: blog.name,
};

  if (!newPost) {
    return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  }
  postsRepository.createPost(newPost);
  res.status(HTTP_STATUSES.CREATED_201).send(newPost);
}
