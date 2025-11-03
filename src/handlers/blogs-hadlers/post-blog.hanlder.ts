import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";
import {BlogInputDto} from "../../input-types/blog.input-dto";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model";
import {blogsService} from "../../application/blogs.service";

export async function postBlogHanlder(req: Request<{}, {}, BlogInputDto>, res: Response) {
  try {
    const createdBlog = await blogsService.createBlog(req.body);
    const blogViewModel = mapToBlogViewModel(createdBlog);
    res.status(HTTP_STATUSES.CREATED_201).send(blogViewModel);

    if (!createdBlog) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400);
    }

  } catch (err: unknown) {
      res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}
