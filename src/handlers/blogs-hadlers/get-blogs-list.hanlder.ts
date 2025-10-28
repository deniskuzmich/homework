import { Request, Response } from "express";
import { blogsRepository } from "../../respositories/blogs-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model";

export async function getBlogsListHandler(req: Request, res: Response) {
  try {
    const foundBlogs = await blogsRepository.findBlogs()
    const blogsViewModel = foundBlogs.map(mapToBlogViewModel)
    res.status(HTTP_STATUSES.OK_200).send(blogsViewModel);
  } catch (err) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}
