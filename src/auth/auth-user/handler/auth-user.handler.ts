import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {jwtService} from "../../../common/services/jwt.service";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";
import {authService} from "../../service/auth-service";

export async function authUserHandler(req: Request, res: Response) {
  const { loginOrEmail, password } = req.body;

  try {
    const authUser = await authService.checkCredentials(loginOrEmail, password);

    if (authUser.status !== ResultStatus.Success) {
      res.status(mapResultCodeToHttpExtension(authUser.status)).send(authUser.extensions)
    }
    const token =  jwtService.createJWT(authUser.data!.id);
    const refreshToken = jwtService.createRefreshToken(authUser.data!.id);

    res.cookie('refreshToken', refreshToken, { httpOnly: true , secure: true });

    return res.status(HttpStatuses.Success).send({accessToken: token});
  } catch (e) {
    console.log(e)
    return res.sendStatus(HttpStatuses.ServerError)
  }
}