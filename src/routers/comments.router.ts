import {Router} from "express";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {getCommentByIdHandler} from "../feedback/handler/get-comment.handler";
import {updateCommentsHandler} from "../feedback/handler/update-comments.handler";


export const commentsRouter = Router()
  .get('/:id', getCommentByIdHandler)

  .put('/commentId', authMiddleware, updateCommentsHandler)

  .delete('/commentId', authMiddleware)




