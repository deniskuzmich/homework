import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {mapToBlogViewModel} from "../mapper/map-to-blog-view-model";
import {blogsService} from "../service/blogs.service";

export async function postBlogHanlder(req: Request<{}, {}, BlogInputDto>, res: Response) {
    const createdBlog = await blogsService.createBlog(req.body);

    if (!createdBlog) {
      res.status(ResultStatus.BAD_REQUEST_400);
    }

    const blogViewModel = mapToBlogViewModel(createdBlog);
    res.status(ResultStatus.CREATED_201).send(blogViewModel);

}
