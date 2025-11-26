import { Router } from "express";
import { getPostsListHanlder } from "../posts/handlers/get-posts-list.hanlder";
import { getPostHandler } from "../posts/handlers/get-post.hanlder";
import { updatePostHanlder } from "../posts/handlers/update-post.hanlder";
import { postPostsHandler } from "../posts/handlers/create-posts.hanlder";
import { deletePostHanlder } from "../posts/handlers/delete-post.hanlder";
import { idValidation } from "../core/middleware-validation/id.validation-middleware";
import { inputValidationResultMiddleware } from "../core/middleware-validation/input.validation-result.middleware";
import { postInputValidation } from "../posts/middleware-validation/posts.input.validation-middleware";
import { superAdminGuardMiddleware } from "../auth/auth-admin/super-admin.guard.middleware";
import {paginationValidation} from "../common/validation/pagination-validation";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {createCommentForPostHandler} from "../feedback/handler/create-comment-for-post.handler";
import {contentValidation} from "../feedback/validation/comments-validation";
import {getCommentForPostHandler} from "../feedback/handler/get-comment-from-post.handler";

export const postRouter = Router();
postRouter
  .get("",paginationValidation, getPostsListHanlder)

  .get("/:id", idValidation, inputValidationResultMiddleware, getPostHandler)

  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    postInputValidation,
    inputValidationResultMiddleware,
    updatePostHanlder,
  )

  .post(
    "",
    superAdminGuardMiddleware,
    postInputValidation,
    inputValidationResultMiddleware,
    postPostsHandler,
  )

  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deletePostHanlder,
  )

  .get('/:id/comments', idValidation, paginationValidation, getCommentForPostHandler)
  .post('/:id/comments', authMiddleware, contentValidation, createCommentForPostHandler)



