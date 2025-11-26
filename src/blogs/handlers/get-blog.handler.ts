import { Request, Response } from "express";
import { ResultStatus } from "../../common/types/result.status";
import {mapToBlogViewModel} from "../mapper/map-to-blog-view-model";
import {blogsService} from "../service/blogs.service";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function getBlogHandler(req: Request, res: Response) {

    const blog = await blogsService.getBlogById(req.params.id);
    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound);
    }
    const blogViewModel = mapToBlogViewModel(blog)
    res.status(HttpStatuses.Success).send(blogViewModel);
}