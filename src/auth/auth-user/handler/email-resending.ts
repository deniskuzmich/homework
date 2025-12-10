import {Request, Response} from "express";
import {authService} from "../../service/auth-service";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";
import {ResultStatus} from "../../../common/types/result.status";

export async function emailResendingHandler (req: Request, res: Response) {
  const result = await authService.resendEmail(req.body.email);
  if (result.status !== ResultStatus.NoContent) {
    return res.status(mapResultCodeToHttpExtension(result.status)).send({errorsMessages: result.extensions})
  }
  return res.sendStatus(mapResultCodeToHttpExtension(result.status))
}