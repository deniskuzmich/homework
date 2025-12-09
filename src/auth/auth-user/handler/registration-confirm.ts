import {Request, Response} from "express";
import {authService} from "../../service/auth-service";

export async function registrationConfirmHandler (req: Request, res: Response) {
  const result = await authService.confirmEmail(req.body.code, req.body.email);
  return res.sendStatus(204)
}