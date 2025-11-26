import {Router} from "express";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {getCommentByIdHandler} from "../feedback/handler/get-comment.handler";
import {updateCommentsHandler} from "../feedback/handler/update-comments.handler";
import {commentInputValidation} from "../feedback/validation/comments-validation";
import {deleteCommentHandler} from "../feedback/handler/delete-comment.handler";


export const commentsRouter = Router()
  .get('/:id', getCommentByIdHandler)

  .put('/:commentId', authMiddleware, commentInputValidation, updateCommentsHandler)

  .delete('/:commentId', authMiddleware, deleteCommentHandler)




