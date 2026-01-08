import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {AuthService} from "../../service/auth-service";

export class AboutMeHandler {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  me = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }
    const userInfo = await this.authService.getInfo(req.user)

    return res.status(HttpStatuses.Success).send(userInfo)
  }
}

