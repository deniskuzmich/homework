import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {parseQueryInput} from "../mapper/query-input.mapper";
import {BlogsQueryRepository} from "../repository/blogs-query-repository";
import {injectable, inject} from "inversify";

@injectable()
export class GetBlogsListHandler {

  constructor(
    @inject(BlogsQueryRepository)
    public blogsQueryRepository: BlogsQueryRepository) {}

  async getBlogs (req: Request, res: Response) {
    const queryInput = parseQueryInput(req.query)
    const blogsListOutput = await this.blogsQueryRepository.findBlogs(queryInput)

    return res.status(HttpStatuses.Success).send(blogsListOutput);
  }
}

