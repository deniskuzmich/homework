import { Request, Response } from "express";
import { postsRepository } from "../../respositories/posts-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";
import {Post} from "../../core/types/posts-types";
import {PostInputDto} from "../../input-types/post.input-dto";
import {blogsRepository} from "../../respositories/blogs-repository";
import {mapToPostViewModel} from "../mappers/map-to-post-view-model";

export async function postPostsHandler(req: Request <{},{}, PostInputDto>, res: Response) {
  try {
    const blog = await blogsRepository.getBlogById(req.body.blogId);
    if (!blog) return null;

    const newPost: Post = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      blogId: req.body.blogId,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };

    if (!newPost) {
      return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }

    const createdPost = await postsRepository.createPost(newPost);
    const postViewModel = mapToPostViewModel(createdPost)
    res.status(HTTP_STATUSES.CREATED_201).send(postViewModel);

  } catch (e: unknown) {
    res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
  }
}
