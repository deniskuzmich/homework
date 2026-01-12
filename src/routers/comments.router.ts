import {Router} from "express";
import {commentInputValidation} from "../comments/validation/comments-validation";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {container} from "../core/ioc/ioc";
import {GetCommentByIdHandler} from "../comments/handler/get-comment.handler";
import {UpdateCommentsHandler} from "../comments/handler/update-comments.handler";
import {DeleteCommentHandler} from "../comments/handler/delete-comment.handler";
import {AuthMiddleWare} from "../auth/middleware/auth.middleware";

const getCommentByIdHandler = container.get(GetCommentByIdHandler);
const updateCommentsHandler = container.get(UpdateCommentsHandler);
const deleteCommentHandler = container.get(DeleteCommentHandler);
const authMiddleware = container.get(AuthMiddleWare);

export const commentsRouter = Router()
  .get('/:id',
    inputValidationResultMiddleware,
    getCommentByIdHandler.getCommentById.bind(getCommentByIdHandler))

  .put('/:commentId',
    authMiddleware.authMiddleWare.bind(authMiddleware),
    commentInputValidation,
    inputValidationResultMiddleware,
    updateCommentsHandler.update.bind(updateCommentsHandler))

  .delete('/:commentId',
    authMiddleware.authMiddleWare.bind(authMiddleware),
    inputValidationResultMiddleware,
    deleteCommentHandler.delete.bind(deleteCommentHandler))




