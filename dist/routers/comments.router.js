"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../auth/middleware/auth.middleware");
const comments_validation_1 = require("../comments/validation/comments-validation");
const input_validation_result_middleware_1 = require("../common/middleware-validation/input.validation-result.middleware");
const composition_root_1 = require("../core/composition/composition-root");
exports.commentsRouter = (0, express_1.Router)()
    .get('/:id', input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.getCommentByIdHandler.getCommentById)
    .put('/:commentId', auth_middleware_1.authMiddleware, comments_validation_1.commentInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.updateCommentsHandler.update)
    .delete('/:commentId', auth_middleware_1.authMiddleware, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.deleteCommentHandler.delete);
