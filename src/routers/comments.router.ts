import {Router} from "express";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {commentInputValidation} from "../comments/validation/comments-validation";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {container} from "../core/ioc/ioc";
import {GetCommentByIdHandler} from "../comments/handler/get-comment.handler";
import {UpdateCommentsHandler} from "../comments/handler/update-comments.handler";
import {DeleteCommentHandler} from "../comments/handler/delete-comment.handler";

const getCommentByIdHandler = container.get(GetCommentByIdHandler);
const updateCommentsHandler = container.get(UpdateCommentsHandler);
const deleteCommentHandler = container.get(DeleteCommentHandler);

export const commentsRouter = Router()
  .get('/:id',
    inputValidationResultMiddleware,
    getCommentByIdHandler.getCommentById.bind(getCommentByIdHandler))

  .put('/:commentId',
    authMiddleware,
    commentInputValidation,
    inputValidationResultMiddleware,
    updateCommentsHandler.update.bind(updateCommentsHandler))

  .delete('/:commentId',
    authMiddleware,
    inputValidationResultMiddleware,
    deleteCommentHandler.delete.bind(deleteCommentHandler))




