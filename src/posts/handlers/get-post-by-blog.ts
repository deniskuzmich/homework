import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
import {blogsService, postsQueryRepository} from "../../core/composition/composition-root";

export class GetPostByBlogIdHandler {
  async getPost(req: Request, res: Response) {
    const query = valuesPaginationMaper(req.query);

    const blog = await blogsService.getBlogById(req.params.id);
    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound)
    }

    const post = await postsQueryRepository.getPostByBlogId(blog._id.toString(), query)
    if (!post) {
      return res.sendStatus(HttpStatuses.NotFound)
    }
    res.status(HttpStatuses.Success).send(post)
  }
}
