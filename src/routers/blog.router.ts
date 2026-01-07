import {Router} from "express";
import {idValidation} from "../common/middleware-validation/id.validation-middleware";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {blogsInputValidation} from "../blogs/middleware-validation/blogs.input.validation-middleware";
import {superAdminGuardMiddleware} from "../auth/auth-admin/super-admin.guard.middleware";
import {paginationValidation} from "../common/validation/pagination-validation";
import {postInputDtoValidation} from "../posts/middleware-validation/post-inputDto-validation";


import {
  createBlogHandler, createPostForBlogHandler, deleteBlogHandler,
  getBlogHandler,
  getBlogsListHandler, getPostByBlogIdHandler,
  updateBlogHandler
} from "../core/composition/composition-root";


export const blogRouter = Router();

blogRouter
  .get("",paginationValidation, getBlogsListHandler.getBlogs)

  .get("/:id", idValidation, inputValidationResultMiddleware, getBlogHandler.getBlog)

  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    blogsInputValidation,
    inputValidationResultMiddleware,
    updateBlogHandler.update,
  )

  .post(
    "",
    superAdminGuardMiddleware,
    blogsInputValidation,
    inputValidationResultMiddleware,
    createBlogHandler.create,
  )

  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHandler.delete,
  )

  .get("/:id/posts",idValidation,inputValidationResultMiddleware,paginationValidation, getPostByBlogIdHandler.getPost)
  .post("/:id/posts", superAdminGuardMiddleware,postInputDtoValidation,inputValidationResultMiddleware, createPostForBlogHandler.createPost)



