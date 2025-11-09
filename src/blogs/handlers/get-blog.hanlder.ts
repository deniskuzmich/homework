import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../core/http_statuses/http_statuses";
import {mapToBlogViewModel} from "../mapper/map-to-blog-view-model";
import {blogsService} from "../service/blogs.service";

export async function getBlogHandler(req: Request, res: Response) {

    const blog = await blogsService.getBlogById(req.params.id);
    if (!blog) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
    const blogViewModel = mapToBlogViewModel(blog)
    res.status(HTTP_STATUSES.OK_200).send(blogViewModel);
}