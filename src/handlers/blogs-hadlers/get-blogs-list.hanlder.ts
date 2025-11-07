import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../core/http_statuses/http_statuses";
import {blogsService} from "../../application/blogs.service";
import {BlogQueryInput} from "../../input/blogs-input/blogs-query.input";

export async function getBlogsListHandler(
  req: Request, res: Response) {
  try {
    const queryInput: BlogQueryInput = req.query

    const blogsListOutput = await blogsService.findBlogs(queryInput)

    res.status(HTTP_STATUSES.OK_200).send(blogsListOutput);
  } catch (err) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}
