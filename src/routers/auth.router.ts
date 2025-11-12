import {Router} from "express";
import {loginUserHandler} from "../auth/auth-user/auth-user.handler";

export const authRouter = Router()
  authRouter.post('/login', loginUserHandler)