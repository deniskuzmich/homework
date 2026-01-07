import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {authService} from "../../../core/composition/composition-root";

export class AboutMeHandler {
  async me(req: Request, res: Response) {
    if (!req.user) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }
    const userInfo = await authService.getInfo(req.user)

    return res.status(HttpStatuses.Success).send(userInfo)
  }
}

