import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwtService";


export const softAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const jwtService = new JwtService();
  // 1. Проверяем наличие заголовка
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }

  // 2. Достаем токен (Bearer <token>)
  const token = authHeader.split(' ')[1];
  if (!token) {
    return next();
  }

  // 3. Пытаемся получить userId из токена
  // Если токен протух или неверен, метод должен вернуть null, а НЕ кидать ошибку
  const userId =  jwtService.getUserInfoByToken(token);

  // 4. Если юзер найден — добавляем его в request
  if (userId) {
    req.user = { userId: userId.toString(), login: '', email: '' }; // Заполняем минимально необходимым
  }

  // 5. В любом случае идем дальше
  next();
}