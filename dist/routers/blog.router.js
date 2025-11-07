"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const get_blogs_list_hanlder_1 = require("../handlers/blogs-hadlers/get-blogs-list.hanlder");
const update_blog_hanlder_1 = require("../handlers/blogs-hadlers/update-blog.hanlder");
const post_blog_hanlder_1 = require("../handlers/blogs-hadlers/post-blog.hanlder");
const delete_blog_hanlder_1 = require("../handlers/blogs-hadlers/delete-blog.hanlder");
const get_blog_hanlder_1 = require("../handlers/blogs-hadlers/get-blog.hanlder");
const id_validation_middleware_1 = require("../core/middlewares/validation/id.validation-middleware");
const input_validation_result_middleware_1 = require("../core/middlewares/validation/input.validation-result.middleware");
const blogs_input_validation_middleware_1 = require("../core/middlewares/validation/blogs.validation-middleware/blogs.input.validation-middleware");
const super_admin_guard_middleware_1 = require("../auth/super-admin.guard.middleware");
const pagination_validation_1 = require("../common/validation/pagination-validation");
const post_input_validation_1 = require("../common/validation/post-input-validation");
const create_post_for_blog_handler_1 = require("../handlers/blogs-hadlers/create-post-for-blog.handler");
exports.blogRouter = (0, express_1.Router)();
exports.blogRouter
    .get("", pagination_validation_1.paginationValidation, get_blogs_list_hanlder_1.getBlogsListHandler)
    .get("/:id", id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, get_blog_hanlder_1.getBlogHandler)
    .put("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, blogs_input_validation_middleware_1.blogsInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, update_blog_hanlder_1.updateBlogHandler)
    .post("", super_admin_guard_middleware_1.superAdminGuardMiddleware, blogs_input_validation_middleware_1.blogsInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, post_blog_hanlder_1.postBlogHanlder)
    .post("/:id/posts", super_admin_guard_middleware_1.superAdminGuardMiddleware, blogs_input_validation_middleware_1.blogsInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, post_blog_hanlder_1.postBlogHanlder)
    .delete("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, delete_blog_hanlder_1.deleteBlogHanlder)
    .get("/:id/posts", id_validation_middleware_1.idValidation, pagination_validation_1.paginationValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, get_blog_hanlder_1.getBlogHandler)
    .post("/:id/posts", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, post_input_validation_1.postInputDtoValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, create_post_for_blog_handler_1.createPostForBlogHandler);
