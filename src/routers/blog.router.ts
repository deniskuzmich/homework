import {Router} from "express";
import {idValidation} from "../common/middleware-validation/id.validation-middleware";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {blogsInputValidation} from "../blogs/middleware-validation/blogs.input.validation-middleware";
import {superAdminGuardMiddleware} from "../auth/auth-admin/super-admin.guard.middleware";
import {paginationValidation} from "../common/validation/pagination-validation";
import {postInputDtoValidation} from "../posts/middleware-validation/post-inputDto-validation";
import {GetBlogsListHandler} from "../blogs/handlers/get-blogs-list.hanlder";
import {container} from "../core/ioc/ioc";
import {GetBlogHandler} from "../blogs/handlers/get-blog.handler";
import {UpdateBlogHandler} from "../blogs/handlers/update-blog.hanlder";
import {CreateBlogHandler} from "../blogs/handlers/create-blog.hanlder";
import {DeleteBlogHandler} from "../blogs/handlers/delete-blog.hanlder";
import {GetPostByBlogIdHandler} from "../posts/handlers/get-post-by-blog";
import {CreatePostForBlogHandler} from "../posts/handlers/create-post-for-blog.handler";
import {softAuthMiddleware} from "../common/middleware-validation/soft-auth-middleware";

const getBlogsListHandler = container.get(GetBlogsListHandler);
const getBlogHandler = container.get(GetBlogHandler);
const updateBlogHandler = container.get(UpdateBlogHandler);
const createBlogHandler = container.get(CreateBlogHandler);
const deleteBlogHandler = container.get(DeleteBlogHandler);
const getPostByBlogIdHandler = container.get(GetPostByBlogIdHandler);
const createPostForBlogHandler = container.get(CreatePostForBlogHandler);

export const blogRouter = Router();
blogRouter
  .get("",paginationValidation, getBlogsListHandler.getBlogs.bind(getBlogsListHandler))

  .get("/:id", idValidation, inputValidationResultMiddleware, getBlogHandler.getBlog.bind(getBlogHandler))

  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    blogsInputValidation,
    inputValidationResultMiddleware,
    updateBlogHandler.update.bind(updateBlogHandler),
  )

  .post(
    "",
    superAdminGuardMiddleware,
    blogsInputValidation,
    inputValidationResultMiddleware,
    createBlogHandler.create.bind(createBlogHandler),
  )

  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHandler.delete.bind(deleteBlogHandler),
  )

  .get("/:id/posts",
    softAuthMiddleware,
    idValidation,
    paginationValidation,
    inputValidationResultMiddleware,
    getPostByBlogIdHandler.getPost.bind(getPostByBlogIdHandler))

  .post("/:id/posts",
    superAdminGuardMiddleware,
    postInputDtoValidation,
    inputValidationResultMiddleware,
    createPostForBlogHandler.createPost.bind(createPostForBlogHandler))



