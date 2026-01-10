import {AuthService} from "../../service/auth-service";
import {Request, Response} from "express";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";

export class PasswordRecovery {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  recovery = async (req: Request, res: Response) => {
    const result = await this.authService.passwordRecovery(req.body.email);
    if (result.status !== ResultStatus.NoContent) {
      return res.sendStatus(mapResultCodeToHttpExtension(result.status))
    }
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
}


