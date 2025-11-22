import { Request, Response } from "express";
import { ResultStatus } from "../../common/types/result.status";
import {blogsService} from "../service/blogs.service";
import {BlogQueryInput} from "../types/input-types/blogs-query.input";

export async function getBlogsListHandler(req: Request, res: Response) {
    const queryInput: BlogQueryInput = req.query
    const blogsListOutput = await blogsService.findBlogs(queryInput)

    res.status(ResultStatus.Success).send(blogsListOutput);
}
