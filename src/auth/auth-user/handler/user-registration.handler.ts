import {Request, Response} from "express";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";
import {authService} from "../../../core/composition/composition-root";

export class UserRegistrationHandler {
  async registration (req: Request, res: Response) {
    const login = req.body.login;
    const email = req.body.email;
    const password = req.body.password;

    const user = await authService.registerUser(login, email, password);
    if (user.status !== ResultStatus.NoContent) {
      return res.status(mapResultCodeToHttpExtension(user.status)).send({errorsMessages: user.extensions})
    }
    return res.sendStatus(mapResultCodeToHttpExtension(user.status));
  }
}


