import {Request, Response, Router} from "express";
import {db} from "../db/in-memory.db.";
import {HTTP_STATUSES} from "../http_statuses/http_statuses";
import {createErrorMessages} from "../utils/error.utils";
import {videoInputValidation} from "../validation/videoInputValidation";
import {Post} from "../types/posts-types";

export const postRouter = Router();

postRouter.get("", (req: Request, res: Response) => {
  res.status(HTTP_STATUSES.OK_200).send(db.posts);
});

postRouter.get('/:id', (req: Request, res: Response) => {
  const post = db.posts.find(post => post.id === req.params.id);
  if (!post) {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
  res.status(HTTP_STATUSES.OK_200).send(post);
})

postRouter.put('/:id', (req: Request, res: Response) => {
  // const errors = videoInputValidation(req.body)

  // if (errors.length > 0) {
  //   res.status(HTTP_STATUSES.BAD_REQUEST_400).send(createErrorMessages(errors));
  //   return
  // }

  const post = db.posts.find(post => post.id === req.params.id);
  if (!post) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return
  }
    post.title = req.body.name,
    post.shortDescription = req.body.description,
    post.content = req.body.content,
    post.blogId = req.body.blogId,

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

postRouter.post("", (req: Request, res: Response) => {
  // const errors = videoInputValidation(req.body)
  //
  // if (errors.length > 0) {
  //   res.status(HTTP_STATUSES.BAD_REQUEST_400).send(createErrorMessages(errors));
  //   return
  // }

  const newPost: Post = {
    id: (db.posts.length ? db.posts[db.posts.length - 1].id + 1 : 1).toString(),
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
    blogName: req.body.blogName,
  }
  db.posts.push(newPost);
  res.status(HTTP_STATUSES.CREATED_201).send(newPost);
})

postRouter.delete('/:id', (req: Request, res: Response) => {
  for (let i = 0; i < db.posts.length; i++) {
    if (db.posts[i].id === req.params.id) {
      db.posts.splice(i, 1);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
      return
    }
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})
