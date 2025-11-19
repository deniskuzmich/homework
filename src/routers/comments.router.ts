import {Router} from "express";
import {authMiddleware} from "../auth/middleware/auth-middleware";
import {createCommentsHandler} from "../feedback/handler/create-comments.handler";
import {getCommentByIdHandler} from "../feedback/handler/get-comment.handler";

export const commentsRouter = Router()
  .get('/:id', getCommentByIdHandler)

  .post('/commentId', authMiddleware, createCommentsHandler)

  .delete('/commentId', authMiddleware)