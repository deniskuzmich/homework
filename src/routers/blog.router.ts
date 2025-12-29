import { Router } from "express";
import { getBlogsListHandler } from "../blogs/handlers/get-blogs-list.hanlder";
import { updateBlogHandler } from "../blogs/handlers/update-blog.hanlder";
import { createBlogHanlder } from "../blogs/handlers/create-blog.hanlder";
import { deleteBlogHandler } from "../blogs/handlers/delete-blog.hanlder";
import { getBlogHandler } from "../blogs/handlers/get-blog.handler";
import { idValidation } from "../common/middleware-validation/id.validation-middleware";
import { inputValidationResultMiddleware } from "../common/middleware-validation/input.validation-result.middleware";
import { blogsInputValidation } from "../blogs/middleware-validation/blogs.input.validation-middleware";
import { superAdminGuardMiddleware } from "../auth/auth-admin/super-admin.guard.middleware";
import {paginationValidation} from "../common/validation/pagination-validation";
import {postInputDtoValidation} from "../posts/middleware-validation/post-inputDto-validation";
import {createPostForBlogHandler} from "../posts/handlers/create-post-for-blog.handler";
import {getPostByBlogIdHanlder} from "../posts/handlers/get-post-by-blog";


export const blogRouter = Router();

blogRouter
  .get("",paginationValidation, getBlogsListHandler)

  .get("/:id", idValidation, inputValidationResultMiddleware, getBlogHandler)

  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    blogsInputValidation,
    inputValidationResultMiddleware,
    updateBlogHandler,
  )

  .post(
    "",
    superAdminGuardMiddleware,
    blogsInputValidation,
    inputValidationResultMiddleware,
    createBlogHanlder,
  )

  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHandler,
  )

  .get("/:id/posts",idValidation,inputValidationResultMiddleware,paginationValidation, getPostByBlogIdHanlder)
  .post("/:id/posts", superAdminGuardMiddleware,postInputDtoValidation,inputValidationResultMiddleware,createPostForBlogHandler)



