import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";
import {randomUUID} from "node:crypto";
import {AuthService} from "../../service/auth-service";
import {JwtService} from "../../../common/services/jwtService";
import {DeviceService} from "../../../devices/service/deviceService";
import {inject, injectable} from "inversify";

@injectable()
export class AuthUserHandler {

  constructor(
    @inject(AuthService)
    public authService: AuthService,
    @inject(JwtService)
    public jwtService: JwtService,
    @inject(DeviceService)
    public deviceService: DeviceService) {
  }

  login = async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body;
    const deviceId = randomUUID()
    const ip: string | undefined = req.ip
    const deviceName = req.headers['user-agent'] ?? 'Some device'

    try {
      const authUser = await this.authService.checkCredentials(loginOrEmail, password);
      if (authUser.status !== ResultStatus.Success) {
        return res.status(mapResultCodeToHttpExtension(authUser.status)).send(authUser.extensions)
      }

      const token = this.jwtService.createJWT(authUser.data!.id);
      const refreshToken = this.jwtService.createRefreshToken(authUser.data!.id, deviceId);

      await this.deviceService.createSession(authUser.data!.id, refreshToken, ip, deviceName)

      res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true});

      return res.status(HttpStatuses.Success).send({accessToken: token});
    } catch (e) {
      console.log(e)
      return res.sendStatus(HttpStatuses.ServerError)
    }
  }
}