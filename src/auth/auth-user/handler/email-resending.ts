import {Request, Response} from "express";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";
import {ResultStatus} from "../../../common/types/result.status";
import {AuthService} from "../../service/auth-service";


export class EmailResendingHandler {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  resending = async (req: Request, res: Response) => {
    const result = await this.authService.resendEmail(req.body.email);
    if (result.status !== ResultStatus.NoContent) {
      return res.status(mapResultCodeToHttpExtension(result.status)).send({errorsMessages: result.extensions})
    }
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
}

