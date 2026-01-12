import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {AuthService} from "../../service/auth-service";
import {inject, injectable} from "inversify";

@injectable()
export class AboutMeHandler {

  constructor(
    @inject(AuthService)
    public authService: AuthService) {
  }

  async me(req: Request, res: Response) {
    if (!req.user) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }
    const userInfo = await this.authService.getInfo(req.user)

    return res.status(HttpStatuses.Success).send(userInfo)
  }
}

