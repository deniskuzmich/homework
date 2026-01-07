import { Router } from "express";
import { idValidation } from "../common/middleware-validation/id.validation-middleware";
import { inputValidationResultMiddleware } from "../common/middleware-validation/input.validation-result.middleware";
import { postInputValidation } from "../posts/middleware-validation/posts.input.validation-middleware";
import { superAdminGuardMiddleware } from "../auth/auth-admin/super-admin.guard.middleware";
import {paginationValidation} from "../common/validation/pagination-validation";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {contentValidation} from "../comments/validation/comments-validation";

import {
  createCommentForPostHandler,
  createPostsHandler, deletePostHandler, getCommentForPostHandler,
  getPostHandler,
  getPostListHandler,
  updatePostHandler
} from "../core/composition/composition-root";

export const postRouter = Router();
postRouter
  .get("",paginationValidation, getPostListHandler.getPostList)

  .get("/:id", idValidation, inputValidationResultMiddleware, getPostHandler.getPost)

  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    postInputValidation,
    inputValidationResultMiddleware,
    updatePostHandler.updatePost,
  )

  .post(
    "",
    superAdminGuardMiddleware,
    postInputValidation,
    inputValidationResultMiddleware,
    createPostsHandler.createPost,
  )

  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deletePostHandler.deletePost,
  )

  .get('/:id/comments', idValidation, paginationValidation,inputValidationResultMiddleware, getCommentForPostHandler.getComment)
  .post('/:id/comments', authMiddleware, contentValidation, inputValidationResultMiddleware, createCommentForPostHandler.createComment)



