"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../auth/middleware/auth.middleware");
const get_comment_handler_1 = require("../feedback/handler/get-comment.handler");
const update_comments_handler_1 = require("../feedback/handler/update-comments.handler");
const comments_validation_1 = require("../feedback/validation/comments-validation");
const delete_comment_handler_1 = require("../feedback/handler/delete-comment.handler");
exports.commentsRouter = (0, express_1.Router)()
    .get('/:id', get_comment_handler_1.getCommentByIdHandler)
    .put('/commentId', auth_middleware_1.authMiddleware, comments_validation_1.commentInputValidation, update_comments_handler_1.updateCommentsHandler)
    .delete('/commentId', auth_middleware_1.authMiddleware, delete_comment_handler_1.deleteCommentHandler);
