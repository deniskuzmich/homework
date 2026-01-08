import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {parseQueryInput} from "../mapper/query-input.mapper";
import {BlogsQueryRepository} from "../repository/blogs-query-repository";

export class GetBlogsListHandler {
  blogsQueryRepository: BlogsQueryRepository;

  constructor(blogsQueryRepository: BlogsQueryRepository) {
    this.blogsQueryRepository = blogsQueryRepository;
  }

  getBlogs = async (req: Request, res: Response) => {
       const queryInput = parseQueryInput(req.query)
       const blogsListOutput = await this.blogsQueryRepository.findBlogs(queryInput)

       res.status(HttpStatuses.Success).send(blogsListOutput);
   }
}

