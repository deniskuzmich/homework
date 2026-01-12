import {NextFunction, Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {UserInfoType} from "../../users/types/output-types/user-info.type";
import {jwtService, usersService} from "../../core/ioc/composition-root";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const token = req.headers.authorization.split(" ")[1];

    const payload = jwtService.getUserInfoByToken(token);
    if (!payload) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }
    const userFromDb = await usersService.getUserById(payload.userId.toString());
    if (!userFromDb) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const userInfo: UserInfoType = {
      userId: userFromDb._id.toString(),
      login: userFromDb.login,
      email: userFromDb.email
    };

    req.user = userInfo;
    next();
  } catch (e) {
    console.log(e)
    return res.sendStatus(HttpStatuses.ServerError)
  }
}