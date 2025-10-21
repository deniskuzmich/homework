import {Router} from "express";
import {getPostsListHanlder} from "../handlers/posts-handlers/get-posts-list.hanlder";
import {getPostHandler} from "../handlers/posts-handlers/get-post.hanlder";
import {updatePostHanlder} from "../handlers/posts-handlers/update-post.hanlder";
import {postPostsHandler} from "../handlers/posts-handlers/post-posts.hanlder";
import {deletePostHanlder} from "../handlers/posts-handlers/delete-post.hanlder";
import {idValidation} from "../core/middlewares/validation/id.validation-middleware";
import {inputValidationResultMiddleware} from "../core/middlewares/validation/input.validation-result.middleware";
import {
  postInputValidation
} from "../core/middlewares/validation/posts.validation-middleware/posts.input.validation-middleware";
import {superAdminGuardMiddleware} from "../auth/super-admin.guard.middleware";

export const postRouter = Router();
postRouter
  .get("", getPostsListHanlder)

  .get("/:id", idValidation, inputValidationResultMiddleware, getPostHandler)

  .put("/:id", superAdminGuardMiddleware, idValidation, postInputValidation, inputValidationResultMiddleware, updatePostHanlder)

  .post("", superAdminGuardMiddleware, postInputValidation, inputValidationResultMiddleware, postPostsHandler)

  .delete("/:id", superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deletePostHanlder)
