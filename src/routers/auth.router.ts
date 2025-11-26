import {Router} from "express";
import {authUserHandler} from "../auth/auth-user/auth-user.handler";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {aboutMeHandler} from "../auth/auth-me/auth-me-handler";


export const authRouter = Router()
  .post('/login', authUserHandler)

  .get('/me', authMiddleware, aboutMeHandler)
