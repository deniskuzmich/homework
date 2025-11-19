"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../auth/middleware/auth-middleware");
const create_comments_handler_1 = require("../feedback/handler/create-comments.handler");
const get_comment_handler_1 = require("../feedback/handler/get-comment.handler");
exports.commentsRouter = (0, express_1.Router)()
    .get('/:id', get_comment_handler_1.getCommentByIdHandler)
    .post('/commentId', auth_middleware_1.authMiddleware, create_comments_handler_1.createCommentsHandler)
    .delete('/commentId', auth_middleware_1.authMiddleware);
