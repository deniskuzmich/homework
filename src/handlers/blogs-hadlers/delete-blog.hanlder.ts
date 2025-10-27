import { Request, Response } from "express";
import { blogsRepository } from "../../respositories/blogs-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";

export async function deleteBlogHanlder(req: Request, res: Response) {
  try {
    const blog = blogsRepository.getBlogById(req.params.id);
    if (!blog) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    await blogsRepository.deleteBlog(req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);


  } catch (e: unknown) {
    res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
  }
}
