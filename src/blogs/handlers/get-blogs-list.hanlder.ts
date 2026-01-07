import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {parseQueryInput} from "../mapper/query-input.mapper";
import {blogsQueryRepository} from "../../core/composition/composition-root";

export class GetBlogsListHandler {
   async getBlogs(req: Request, res: Response) {
       const queryInput = parseQueryInput(req.query)
       const blogsListOutput = await blogsQueryRepository.findBlogs(queryInput)

       res.status(HttpStatuses.Success).send(blogsListOutput);
   }
}

