import {Request, Response} from "express";
import {usersService} from "../../users/service/users.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {jwtService} from "../../common/services/jwt.service";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";

export async function authUserHandler(req: Request, res: Response) {
  const { loginOrEmail, password } = req.body;

  try {
    const authUser = await usersService.checkCredentials(loginOrEmail, password);

    if (authUser.status === ResultStatus.Unauthorized) {
      // Log the error or extensions to check the exact details
      return res.status(HttpStatuses.Unauthorized).send(authUser.extensions);
    }

    if (authUser.status !== ResultStatus.Success) {
      return res.status(mapResultCodeToHttpExtension(authUser.status)).send(authUser.extensions)
    }
    const token = await jwtService.createJWT(authUser.data!);
    return res.status(HttpStatuses.Success).send({accessToken: token});
  } catch (e) {
    return res.sendStatus(HttpStatuses.ServerError)
  }
}