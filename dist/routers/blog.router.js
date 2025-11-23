"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const get_blogs_list_hanlder_1 = require("../blogs/handlers/get-blogs-list.hanlder");
const update_blog_hanlder_1 = require("../blogs/handlers/update-blog.hanlder");
const post_blog_hanlder_1 = require("../blogs/handlers/post-blog.hanlder");
const delete_blog_hanlder_1 = require("../blogs/handlers/delete-blog.hanlder");
const get_blog_handler_1 = require("../blogs/handlers/get-blog.handler");
const id_validation_middleware_1 = require("../core/middleware-validation/id.validation-middleware");
const input_validation_result_middleware_1 = require("../core/middleware-validation/input.validation-result.middleware");
const blogs_input_validation_middleware_1 = require("../blogs/middleware-validation/blogs.input.validation-middleware");
const super_admin_guard_middleware_1 = require("../auth/auth-admin/super-admin.guard.middleware");
const pagination_validation_1 = require("../common/validation/pagination-validation");
const post_inputDto_validation_1 = require("../posts/middleware-validation/post-inputDto-validation");
const create_post_for_blog_handler_1 = require("../blogs/handlers/create-post-for-blog.handler");
const get_post_by_blog_1 = require("../blogs/handlers/get-post-by-blog");
exports.blogRouter = (0, express_1.Router)();
exports.blogRouter
    .get("", pagination_validation_1.paginationValidation, get_blogs_list_hanlder_1.getBlogsListHandler)
    .get("/:id", id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, get_blog_handler_1.getBlogHandler)
    .put("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, blogs_input_validation_middleware_1.blogsInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, update_blog_hanlder_1.updateBlogHandler)
    .post("", super_admin_guard_middleware_1.superAdminGuardMiddleware, blogs_input_validation_middleware_1.blogsInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, post_blog_hanlder_1.postBlogHanlder)
    .delete("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, delete_blog_hanlder_1.deleteBlogHandler)
    .get("/:id/posts", id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, pagination_validation_1.paginationValidation, get_post_by_blog_1.getPostByBlogIdHanlder)
    .post("/:id/posts", super_admin_guard_middleware_1.superAdminGuardMiddleware, post_inputDto_validation_1.postInputDtoValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, create_post_for_blog_handler_1.createPostForBlogHandler);
