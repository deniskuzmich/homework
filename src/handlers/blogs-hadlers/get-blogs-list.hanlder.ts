import { Request, Response } from "express";
import { blogsRepository } from "../../respositories/blogs-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";

export async function getBlogsListHandler(req: Request, res: Response) {
  try {
    const foundBlogs = await blogsRepository.findBlogs()
    res.status(HTTP_STATUSES.OK_200).send(foundBlogs);
  } catch (err) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}
