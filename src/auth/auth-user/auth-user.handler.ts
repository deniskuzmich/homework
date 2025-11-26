import {Request, Response} from "express";
import {usersService} from "../../users/service/users.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {jwtService} from "../../common/services/jwt.service";

export async function authUserHandler(req: Request, res: Response) {
  const loginOrEmail = req.body.loginOrEmail;
  const password = req.body.password;

  const authUser = await usersService.checkCredentials(loginOrEmail, password);
  if (authUser === null) {
    return res.sendStatus(HttpStatuses.Unauthorized)
  }
  const token = await jwtService.createJWT(authUser);
  return res.status(HttpStatuses.Unauthorized).send(token)
}