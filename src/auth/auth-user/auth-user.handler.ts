import {Request, Response} from "express";
import {usersService} from "../../users/service/users.service";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";

export async function loginUserHandler(req: Request, res: Response) {
  const loginOrEmail = req.body.loginOrEmail;
  const password = req.body.password;

  const checkedResult = await usersService.checkCredentials(loginOrEmail, password);
  if (checkedResult === null) {
    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
  }
  return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}