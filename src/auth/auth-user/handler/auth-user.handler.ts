import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";
import {randomUUID} from "node:crypto";
import {authService, deviceService, jwtService} from "../../../core/composition/composition-root";


export class AuthUserHandler {
   async login(req: Request, res: Response) {
    const {loginOrEmail, password} = req.body;
    const deviceId = randomUUID()
    const ip: string | undefined = req.ip
    const deviceName = req.headers['user-agent'] ?? 'Some device'

    try {
      const authUser = await authService.checkCredentials(loginOrEmail, password);
      if (authUser.status !== ResultStatus.Success) {
        return res.status(mapResultCodeToHttpExtension(authUser.status)).send(authUser.extensions)
      }

      const token = jwtService.createJWT(authUser.data!.id);
      const refreshToken = jwtService.createRefreshToken(authUser.data!.id, deviceId);

      await deviceService.createSession(authUser.data!.id, refreshToken, ip, deviceName)

      res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true});

      return res.status(HttpStatuses.Success).send({accessToken: token});
    } catch (e) {
      console.log(e)
      return res.sendStatus(HttpStatuses.ServerError)
    }
  }
}