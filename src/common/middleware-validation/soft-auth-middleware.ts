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

  // 1. ДОБАВЛЕН await
  // 2. Предполагаем, что метод возвращает объект с полем userId
  const userInfo = await jwtService.getUserInfoByToken(token);

  if (userInfo && userInfo.userId) {
    req.user = {
      userId: userInfo.userId.toString(), // Достаем именно поле userId
      login: userInfo.login || '',
      email: userInfo.email || ''
    };
  }

  next();
}