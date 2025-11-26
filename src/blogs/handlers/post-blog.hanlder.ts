import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {mapToBlogViewModel} from "../mapper/map-to-blog-view-model";
import {blogsService} from "../service/blogs.service";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function postBlogHanlder(req: Request<{}, {}, BlogInputDto>, res: Response) {
    const createdBlog = await blogsService.createBlog(req.body);

    if (!createdBlog) {
      res.status(HttpStatuses.BadRequest);
    }

    const blogViewModel = mapToBlogViewModel(createdBlog);
    res.status(HttpStatuses.Created).send(blogViewModel);

}
