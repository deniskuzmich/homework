"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const id_validation_middleware_1 = require("../common/middleware-validation/id.validation-middleware");
const input_validation_result_middleware_1 = require("../common/middleware-validation/input.validation-result.middleware");
const blogs_input_validation_middleware_1 = require("../blogs/middleware-validation/blogs.input.validation-middleware");
const super_admin_guard_middleware_1 = require("../auth/auth-admin/super-admin.guard.middleware");
const pagination_validation_1 = require("../common/validation/pagination-validation");
const post_inputDto_validation_1 = require("../posts/middleware-validation/post-inputDto-validation");
const composition_root_1 = require("../core/composition/composition-root");
exports.blogRouter = (0, express_1.Router)();
exports.blogRouter
    .get("", pagination_validation_1.paginationValidation, composition_root_1.getBlogsListHandler.getBlogs)
    .get("/:id", id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.getBlogHandler.getBlog)
    .put("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, blogs_input_validation_middleware_1.blogsInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.updateBlogHandler.update)
    .post("", super_admin_guard_middleware_1.superAdminGuardMiddleware, blogs_input_validation_middleware_1.blogsInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.createBlogHandler.create)
    .delete("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.deleteBlogHandler.delete)
    .get("/:id/posts", id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, pagination_validation_1.paginationValidation, composition_root_1.getPostByBlogIdHandler.getPost)
    .post("/:id/posts", super_admin_guard_middleware_1.superAdminGuardMiddleware, post_inputDto_validation_1.postInputDtoValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.createPostForBlogHandler.createPost);
