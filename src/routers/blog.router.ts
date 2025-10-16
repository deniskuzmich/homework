import {Response,Request, Router} from "express";
import {db} from "../db/in-memory.db.";
import {HTTP_STATUSES} from "../http_statuses/http_statuses";
import {createErrorMessages} from "../utils/error.utils";
import {videoInputValidation} from "../validation/videoInputValidation";
import {Blog} from "../types/blogs-types";

export const blogRouter = Router();

blogRouter.get("", (req: Request, res: Response) => {
  res.status(HTTP_STATUSES.OK_200).send(db.blogs);
});

blogRouter.get('/:id', (req: Request, res: Response) => {
  const blog = db.blogs.find(blog => blog.id === req.params.id);
  if (!blog) {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
  res.status(HTTP_STATUSES.OK_200).send(blog);
})

blogRouter.put('/:id', (req: Request, res: Response) => {
  // const errors = videoInputValidation(req.body)

  // if (errors.length > 0) {
  //   res.status(HTTP_STATUSES.BAD_REQUEST_400).send(createErrorMessages(errors));
  //   return
  // }

  const blog = db.blogs.find(blog => blog.id === req.params.id);
  if (!blog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return
  }
    blog.id = req.body.title,
    blog.name = req.body.name,
    blog.description = req.body.description,
    blog.websiteUrl = req.body.websiteUrl,

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

blogRouter.post("", (req: Request, res: Response) => {
  // const errors = videoInputValidation(req.body)
  //
  // if (errors.length > 0) {
  //   res.status(HTTP_STATUSES.BAD_REQUEST_400).send(createErrorMessages(errors));
  //   return
  // }

  const newBlog: Blog = {
    id: (db.blogs.length ? db.blogs[db.blogs.length - 1].id + 1 : 1).toString(),
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  }
  db.blogs.push(newBlog);
  res.status(HTTP_STATUSES.CREATED_201).send(newBlog);
})

blogRouter.delete('/:id', (req: Request, res: Response) => {
  for (let i = 0; i < db.blogs.length; i++) {
    if (db.blogs[i].id === req.params.id) {
      db.blogs.splice(i, 1);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
      return
    }
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})
