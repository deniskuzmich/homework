import { Router } from "express";
import {getPostsListHanlder} from "../handlers/posts-handlers/get-posts-list.hanlder";
import {getPostHandler} from "../handlers/posts-handlers/get-post.hanlder";
import {updatePostHanlder} from "../handlers/posts-handlers/update-post.hanlder";
import {postPostsHandler} from "../handlers/posts-handlers/post-posts.hanlder";
import {deletePostHanlder} from "../handlers/posts-handlers/delete-post.hanlder";

export const postRouter = Router();

postRouter.get("", getPostsListHanlder);

postRouter.get("/:id", getPostHandler);

postRouter.put("/:id", updatePostHanlder);

postRouter.post("", postPostsHandler);

postRouter.delete("/:id", deletePostHanlder);
