"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const get_posts_list_hanlder_1 = require("../handlers/posts-handlers/get-posts-list.hanlder");
const get_post_hanlder_1 = require("../handlers/posts-handlers/get-post.hanlder");
const update_post_hanlder_1 = require("../handlers/posts-handlers/update-post.hanlder");
const post_posts_hanlder_1 = require("../handlers/posts-handlers/post-posts.hanlder");
const delete_post_hanlder_1 = require("../handlers/posts-handlers/delete-post.hanlder");
const id_validation_middleware_1 = require("../core/middlewares/validation/id.validation-middleware");
const input_validation_result_middleware_1 = require("../core/middlewares/validation/input.validation-result.middleware");
const posts_input_validation_middleware_1 = require("../core/middlewares/validation/posts.validation-middleware/posts.input.validation-middleware");
const super_admin_guard_middleware_1 = require("../auth/super-admin.guard.middleware");
exports.postRouter = (0, express_1.Router)();
exports.postRouter
    .get("", get_posts_list_hanlder_1.getPostsListHanlder)
    .get("/:id", id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, get_post_hanlder_1.getPostHandler)
    .put("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, posts_input_validation_middleware_1.postInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, update_post_hanlder_1.updatePostHanlder)
    .post("", super_admin_guard_middleware_1.superAdminGuardMiddleware, posts_input_validation_middleware_1.postInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, post_posts_hanlder_1.postPostsHandler)
    .delete("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, delete_post_hanlder_1.deletePostHanlder);
