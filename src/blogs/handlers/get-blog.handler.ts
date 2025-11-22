import { Request, Response } from "express";
import { ResultStatus } from "../../common/types/result.status";
import {mapToBlogViewModel} from "../mapper/map-to-blog-view-model";
import {blogsService} from "../service/blogs.service";

export async function getBlogHandler(req: Request, res: Response) {

    const blog = await blogsService.getBlogById(req.params.id);
    if (!blog) {
      return res.sendStatus(ResultStatus.NotFound);
    }
    const blogViewModel = mapToBlogViewModel(blog)
    res.status(ResultStatus.Success).send(blogViewModel);
}