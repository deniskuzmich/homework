import {Router} from "express";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {commentInputValidation} from "../comments/validation/comments-validation";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {deleteCommentHandler, getCommentByIdHandler, updateCommentsHandler} from "../core/composition/composition-root";


export const commentsRouter = Router()
  .get('/:id',inputValidationResultMiddleware, getCommentByIdHandler.getCommentById)

  .put('/:commentId', authMiddleware, commentInputValidation,inputValidationResultMiddleware, updateCommentsHandler.update)

  .delete('/:commentId', authMiddleware, inputValidationResultMiddleware, deleteCommentHandler.delete)




