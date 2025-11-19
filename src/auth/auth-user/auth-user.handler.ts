import {Request, Response} from "express";
import {usersService} from "../../users/service/users.service";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {jwtService} from "../../common/services/jwt.service";


export async function loginUserHandler(req: Request, res: Response) {
  const loginOrEmail = req.body.loginOrEmail;
  const password = req.body.password;

  const authUser = await usersService.checkCredentials(loginOrEmail, password);
  if (authUser === null) {
    return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
  }
  const token = await jwtService.createJWT(authUser);
  return res.status(HTTP_STATUSES.OK_200).send(token)
}