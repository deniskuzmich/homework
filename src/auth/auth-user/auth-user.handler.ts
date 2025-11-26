import {Request, Response} from "express";
import {usersService} from "../../users/service/users.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {jwtService} from "../../common/services/jwt.service";

export async function authUserHandler(req: Request, res: Response) {
  const { loginOrEmail, password } = req.body;

  try {
    const authUser = await usersService.checkCredentials(loginOrEmail, password);
    if (!authUser) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }
    const token = await jwtService.createJWT(authUser);
    return res.status(HttpStatuses.Success).send({accessToken: token});
  } catch (e) {
    return res.sendStatus(HttpStatuses.ServerError)
  }
}