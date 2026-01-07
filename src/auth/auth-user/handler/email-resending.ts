import {Request, Response} from "express";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";
import {ResultStatus} from "../../../common/types/result.status";
import {authService} from "../../../core/composition/composition-root";

export class EmailResendingHandler {
  async resending(req: Request, res: Response) {
    const result = await authService.resendEmail(req.body.email);
    if (result.status !== ResultStatus.NoContent) {
      return res.status(mapResultCodeToHttpExtension(result.status)).send({errorsMessages: result.extensions})
    }
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
}

