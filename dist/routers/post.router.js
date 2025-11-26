"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const get_posts_list_hanlder_1 = require("../posts/handlers/get-posts-list.hanlder");
const get_post_hanlder_1 = require("../posts/handlers/get-post.hanlder");
const update_post_hanlder_1 = require("../posts/handlers/update-post.hanlder");
const create_posts_hanlder_1 = require("../posts/handlers/create-posts.hanlder");
const delete_post_hanlder_1 = require("../posts/handlers/delete-post.hanlder");
const id_validation_middleware_1 = require("../core/middleware-validation/id.validation-middleware");
const input_validation_result_middleware_1 = require("../core/middleware-validation/input.validation-result.middleware");
const posts_input_validation_middleware_1 = require("../posts/middleware-validation/posts.input.validation-middleware");
const super_admin_guard_middleware_1 = require("../auth/auth-admin/super-admin.guard.middleware");
const pagination_validation_1 = require("../common/validation/pagination-validation");
const auth_middleware_1 = require("../auth/middleware/auth.middleware");
const create_comment_for_post_handler_1 = require("../feedback/handler/create-comment-for-post.handler");
const comments_validation_1 = require("../feedback/validation/comments-validation");
const get_comment_from_post_handler_1 = require("../feedback/handler/get-comment-from-post.handler");
exports.postRouter = (0, express_1.Router)();
exports.postRouter
    .get("", pagination_validation_1.paginationValidation, get_posts_list_hanlder_1.getPostsListHanlder)
    .get("/:id", id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, get_post_hanlder_1.getPostHandler)
    .put("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, posts_input_validation_middleware_1.postInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, update_post_hanlder_1.updatePostHanlder)
    .post("", super_admin_guard_middleware_1.superAdminGuardMiddleware, posts_input_validation_middleware_1.postInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, create_posts_hanlder_1.postPostsHandler)
    .delete("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, delete_post_hanlder_1.deletePostHanlder)
    .get('/:id/comments', id_validation_middleware_1.idValidation, pagination_validation_1.paginationValidation, get_comment_from_post_handler_1.getCommentForPostHandler)
    .post('/:id/comments', auth_middleware_1.authMiddleware, comments_validation_1.contentValidation, create_comment_for_post_handler_1.createCommentForPostHandler);
