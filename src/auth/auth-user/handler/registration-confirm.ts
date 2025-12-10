import {Request, Response} from "express";
import {authService} from "../../service/auth-service";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";

export async function registrationConfirmHandler (req: Request, res: Response) {
  const result = await authService.confirmEmail(req.body.code);
  if (result.status !== ResultStatus.Success) {
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
  return res.sendStatus(204)
}