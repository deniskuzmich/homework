"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const id_validation_middleware_1 = require("../common/middleware-validation/id.validation-middleware");
const input_validation_result_middleware_1 = require("../common/middleware-validation/input.validation-result.middleware");
const posts_input_validation_middleware_1 = require("../posts/middleware-validation/posts.input.validation-middleware");
const super_admin_guard_middleware_1 = require("../auth/auth-admin/super-admin.guard.middleware");
const pagination_validation_1 = require("../common/validation/pagination-validation");
const auth_middleware_1 = require("../auth/middleware/auth.middleware");
const comments_validation_1 = require("../comments/validation/comments-validation");
const composition_root_1 = require("../core/composition/composition-root");
exports.postRouter = (0, express_1.Router)();
exports.postRouter
    .get("", pagination_validation_1.paginationValidation, composition_root_1.getPostListHandler.getPostList)
    .get("/:id", id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.getPostHandler.getPost)
    .put("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, posts_input_validation_middleware_1.postInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.updatePostHandler.updatePost)
    .post("", super_admin_guard_middleware_1.superAdminGuardMiddleware, posts_input_validation_middleware_1.postInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.createPostsHandler.createPost)
    .delete("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.deletePostHandler.deletePost)
    .get('/:id/comments', id_validation_middleware_1.idValidation, pagination_validation_1.paginationValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.getCommentForPostHandler.getComment)
    .post('/:id/comments', auth_middleware_1.authMiddleware, comments_validation_1.contentValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.createCommentForPostHandler.createComment);
