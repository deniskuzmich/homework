import {Router} from "express";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {getCommentByIdHandler} from "../feedback/handler/get-comment.handler";
import {updateCommentsHandler} from "../feedback/handler/update-comments.handler";
import {commentInputValidation} from "../feedback/validation/comments-validation";
import {deleteCommentHandler} from "../feedback/handler/delete-comment.handler";
import {inputValidationResultMiddleware} from "../core/middleware-validation/input.validation-result.middleware";


export const commentsRouter = Router()
  .get('/:id',inputValidationResultMiddleware, getCommentByIdHandler)

  .put('/:commentId', authMiddleware, commentInputValidation,inputValidationResultMiddleware, updateCommentsHandler)

  .delete('/:commentId', authMiddleware, inputValidationResultMiddleware, deleteCommentHandler)




