import {Router} from "express";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {getCommentByIdHandler} from "../comments/handler/get-comment.handler";
import {updateCommentsHandler} from "../comments/handler/update-comments.handler";
import {commentInputValidation} from "../comments/validation/comments-validation";
import {deleteCommentHandler} from "../comments/handler/delete-comment.handler";
import {inputValidationResultMiddleware} from "../core/middleware-validation/input.validation-result.middleware";


export const commentsRouter = Router()
  .get('/:id',inputValidationResultMiddleware, getCommentByIdHandler)

  .put('/:commentId', authMiddleware, commentInputValidation,inputValidationResultMiddleware, updateCommentsHandler)

  .delete('/:commentId', authMiddleware, inputValidationResultMiddleware, deleteCommentHandler)




