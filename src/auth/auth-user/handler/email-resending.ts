import {Request, Response} from "express";
import {authService} from "../../service/auth-service";

export async function emailResendingHandler (req: Request, res: Response) {
  const result = await authService.resendEmail(req.body.email);
  return res.sendStatus(204)
}