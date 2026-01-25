import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwtService";

export const softAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const jwtService = new JwtService();
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next();
  }

  const userInfo = await jwtService.getUserInfoByToken(token);

  if (userInfo && userInfo.userId) {
    req.user = {
      userId: userInfo.userId.toString(),
      login: userInfo.login || '',
      email: userInfo.email || ''
    };
  }

  next();
}