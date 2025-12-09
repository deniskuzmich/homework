import {Request, Response} from "express";
import {authService} from "../../service/auth-service";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";

export async function userRegistrationHandler (req: Request, res: Response) {
  const login = req.body.login;
  const email = req.body.email;
  const password = req.body.password;

  const user = await authService.registerUser(login, email, password);
  if (user.status !== ResultStatus.NoContent) {
    return res.status(mapResultCodeToHttpExtension(user.status)).send(user.extensions)
  }
  return res.status(mapResultCodeToHttpExtension(user.status));
}

