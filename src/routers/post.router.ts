import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../http_statuses/http_statuses";
import {postsRepository} from "../respositories/posts-repository";

export const postRouter = Router();

postRouter.get("", (req: Request, res: Response) => {
  const postsBlogs = postsRepository.findPosts(req.query.name?.toString())
  res.status(HTTP_STATUSES.OK_200).send(postsBlogs);
});


postRouter.get('/:id', (req: Request, res: Response) => {
  const post = postsRepository.getPostById(req.params.id);
  if (!post) {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
  res.status(HTTP_STATUSES.OK_200).send(post);
})

postRouter.put('/:id', (req: Request, res: Response) => {
  const post = postsRepository.updatePost(req.params.id, req.body);
  if (!post) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return
  }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

postRouter.post("", (req: Request, res: Response) => {
  const newPost = postsRepository.createPost(req.body);
  res.status(HTTP_STATUSES.CREATED_201).send(newPost);
})

postRouter.delete('/:id', (req: Request, res: Response) => {
  const deletedPost = postsRepository.deletePost(req.params.id);
  if (deletedPost) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})
