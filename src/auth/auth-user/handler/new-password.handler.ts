import {AuthService} from "../../service/auth-service";
import {Request, Response} from "express";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";

export class NewPasswordHandler {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  newPassword = async (req: Request, res: Response) => {
    const result = await this.authService.newPassword(req.body.newPassword, req.body.recoveryCode);
    if (result.status !== ResultStatus.NoContent) {
      return res.status(mapResultCodeToHttpExtension(result.status)).send({errorsMessages: result.extensions })
    }
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
}

