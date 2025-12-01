import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {blogsQueryRepository} from "../repository/blogs-query-repository";
import {parseQueryInput} from "../mapper/query-input.mapper";

export async function getBlogsListHandler(req: Request, res: Response) {
    const queryInput = parseQueryInput(req.query)
    const blogsListOutput = await blogsQueryRepository.findBlogs(queryInput)

    res.status(HttpStatuses.Success).send(blogsListOutput);
}
