import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {mapToBlogViewModel} from "../mapper/map-to-blog-view-model";
import {blogsService} from "../service/blogs.service";

export async function postBlogHanlder(req: Request<{}, {}, BlogInputDto>, res: Response) {
    const createdBlog = await blogsService.createBlog(req.body);

    if (!createdBlog) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400);
    }

    const blogViewModel = mapToBlogViewModel(createdBlog);
    res.status(HTTP_STATUSES.CREATED_201).send(blogViewModel);

}
