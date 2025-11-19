import {NextFunction, Request, Response} from "express";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {jwtService} from "../../common/services/jwt.service";
import {usersService} from "../../users/service/users.service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    return
  }

  const token = req.headers.authorization.split(" ")[1];

  const userId = await jwtService.getUserIdByToken(token);
  if (userId) {
    req.user = await usersService.getUserById(userId.toString());
    next()
  }

  res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
}