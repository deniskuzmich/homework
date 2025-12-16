"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../auth/middleware/auth.middleware");
const get_comment_handler_1 = require("../comments/handler/get-comment.handler");
const update_comments_handler_1 = require("../comments/handler/update-comments.handler");
const comments_validation_1 = require("../comments/validation/comments-validation");
const delete_comment_handler_1 = require("../comments/handler/delete-comment.handler");
const input_validation_result_middleware_1 = require("../core/middleware-validation/input.validation-result.middleware");
exports.commentsRouter = (0, express_1.Router)()
    .get('/:id', input_validation_result_middleware_1.inputValidationResultMiddleware, get_comment_handler_1.getCommentByIdHandler)
    .put('/:commentId', auth_middleware_1.authMiddleware, comments_validation_1.commentInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, update_comments_handler_1.updateCommentsHandler)
    .delete('/:commentId', auth_middleware_1.authMiddleware, input_validation_result_middleware_1.inputValidationResultMiddleware, delete_comment_handler_1.deleteCommentHandler);
