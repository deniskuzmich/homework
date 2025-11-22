import {NextFunction, Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {jwtService} from "../../common/services/jwt.service";
import {usersService} from "../../users/service/users.service";
import {HttpStatuses} from "../../common/types/http-statuses";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    res.sendStatus(HttpStatuses.Unauthorized)
    return
  }

  const token = req.headers.authorization.split(" ")[1];

  const userId = await jwtService.getUserIdByToken(token);
  if (userId) {
    req.user = await usersService.getUserById(userId.toString());
    next()
  }

  res.sendStatus(HttpStatuses.Success)
}