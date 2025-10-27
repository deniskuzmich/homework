import {Request, Response} from "express";
import {blogsRepository} from "../../respositories/blogs-repository";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";
import {BlogInputDto} from "../../input-types/blog.input-dto";
import {Blog} from "../../core/types/blogs-types";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model";

export async function postBlogHanlder(req: Request<{}, {}, BlogInputDto>, res: Response) {
  try {
    const newBlog: Blog = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false
    }
    const createdBlog = await blogsRepository.createBlog(newBlog);
    const blogViewModel = mapToBlogViewModel(createdBlog);
    res.status(HTTP_STATUSES.CREATED_201).send(blogViewModel);

    if (!newBlog) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400);
    }

  } catch (err: unknown) {
      res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}
