import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model";
import {blogsService} from "../../application/blogs.service";


export async function getBlogsListHandler(req: Request, res: Response) {
  try {
    const queryInput = req.query

    const foundBlogs = await blogsService.findBlogs()
    const blogsViewModel = foundBlogs.map(mapToBlogViewModel)
    res.status(HTTP_STATUSES.OK_200).send(blogsViewModel);
  } catch (err) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}
