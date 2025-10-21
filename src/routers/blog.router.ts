import { Router } from "express";
import { getBlogsListHandler } from "../handlers/blogs-hadlers/get-blogs-list.hanlder";
import { updateBlogHandler } from "../handlers/blogs-hadlers/update-blog.hanlder";
import { postBlogHanlder } from "../handlers/blogs-hadlers/post-blog.hanlder";
import { deleteBlogHanlder } from "../handlers/blogs-hadlers/delete-blog.hanlder";
import { getBlogHandler } from "../handlers/blogs-hadlers/get-blog.hanlder";
import { idValidation } from "../core/middlewares/validation/id.validation-middleware";
import { inputValidationResultMiddleware } from "../core/middlewares/validation/input.validation-result.middleware";
import { blogsInputValidation } from "../core/middlewares/validation/blogs.validation-middleware/blogs.input.validation-middleware";
import { superAdminGuardMiddleware } from "../auth/super-admin.guard.middleware";

export const blogRouter = Router();
blogRouter
  .get("", getBlogsListHandler)

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
    postBlogHanlder,
  )

  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHanlder,
  );
