import {Request, Response} from "express";
import {usersService} from "../../../users/service/users.service";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {jwtService} from "../../../common/services/jwt.service";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";

export async function authUserHandler(req: Request, res: Response) {
  const { loginOrEmail, password } = req.body;

  try {
    const authUser = await usersService.checkCredentials(loginOrEmail, password);

    if (authUser.status !== ResultStatus.Success) {
      return res.status(mapResultCodeToHttpExtension(authUser.status)).send(authUser.extensions)
    }
    const token =  jwtService.createJWT(authUser.data!);
    return res.status(HttpStatuses.Success).send({accessToken: token});
  } catch (e) {
    console.log(e)
    return res.sendStatus(HttpStatuses.ServerError)
  }
}