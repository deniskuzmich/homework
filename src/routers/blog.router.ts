import {Response,Request, Router} from "express";
import {HTTP_STATUSES} from "../http_statuses/http_statuses";
import {blogsRepository} from "../respositories/blogs-repository";


export const blogRouter = Router();

blogRouter.get("", (req: Request, res: Response) => {
  const foundBlogs = blogsRepository.findBlogs(req.query.name?.toString())
  res.status(HTTP_STATUSES.OK_200).send(foundBlogs);
});

blogRouter.get('/:id', (req: Request, res: Response) => {
  const blog = blogsRepository.getBlogById(req.params.id);
  if (!blog) {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
  res.status(HTTP_STATUSES.OK_200).send(blog);
})

blogRouter.put('/:id', (req: Request, res: Response) => {
  const blog = blogsRepository.updateBlog(req.params.id, req.body);
  if (!blog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return
  }
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

blogRouter.post("", (req: Request, res: Response) => {
  const newBlog = blogsRepository.createBlog(req.body);
  res.status(HTTP_STATUSES.CREATED_201).send(newBlog);
})

blogRouter.delete('/:id', (req: Request, res: Response) => {
  const deletedBlog = blogsRepository.deleteBlog(req.params.id);
  if (deletedBlog) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})
