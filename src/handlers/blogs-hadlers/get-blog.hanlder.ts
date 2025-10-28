import { Request, Response } from "express";
import { blogsRepository } from "../../respositories/blogs-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model";

export async function getBlogHandler(req: Request, res: Response) {
  try {
    const blog = await blogsRepository.getBlogById(req.params.id);
    if (!blog) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
    const blogViewModel = mapToBlogViewModel(blog)
    res.status(HTTP_STATUSES.OK_200).send(blogViewModel);
  } catch (err) {
    return res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
  }
}