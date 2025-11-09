import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../core/http_statuses/http_statuses";
import {blogsService} from "../service/blogs.service";
import {BlogQueryInput} from "../types/input-types/blogs-query.input";

export async function getBlogsListHandler(
  req: Request, res: Response) {
    const queryInput: BlogQueryInput = req.query

    const blogsListOutput = await blogsService.findBlogs(queryInput)

    res.status(HTTP_STATUSES.OK_200).send(blogsListOutput);
}
