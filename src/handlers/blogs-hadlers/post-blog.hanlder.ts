import {Request, Response} from "express";
import {blogsRepository} from "../../respositories/blogs-repository";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";
import {db} from "../../db/in-memory.db.";
import {BlogInputDto} from "../../input-types/blog.input-dto";
import {Blog} from "../../core/types/blogs-types";

export function postBlogHanlder(req: Request<{}, {}, BlogInputDto>, res: Response) {

  const newBlog: Blog = {
    id: (db.blogs.length ? db.blogs[db.blogs.length - 1].id + 1 : 1).toString(),
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  };

  if (!newBlog) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400);
  }
  blogsRepository.createBlog(newBlog);
  res.status(HTTP_STATUSES.CREATED_201).send(newBlog);

}
