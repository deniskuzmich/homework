import {Request, Response} from "express";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";
import {AuthService} from "../../service/auth-service";

export class RegistrationConfirmHandler {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  confirmation = async (req: Request, res: Response) => {
    const result = await this.authService.confirmEmail(req.body.code);
    if (result.status !== ResultStatus.NoContent) {
      return res.status(mapResultCodeToHttpExtension(result.status)).send({errorsMessages: result.extensions})
    }
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
}

