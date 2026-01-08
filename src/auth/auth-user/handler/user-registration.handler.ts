import {Request, Response} from "express";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";
import {AuthService} from "../../service/auth-service";

export class UserRegistrationHandler {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  registration = async (req: Request, res: Response) => {
    const login = req.body.login;
    const email = req.body.email;
    const password = req.body.password;

    const user = await this.authService.registerUser(login, email, password);
    if (user.status !== ResultStatus.NoContent) {
      return res.status(mapResultCodeToHttpExtension(user.status)).send({errorsMessages: user.extensions})
    }
    return res.sendStatus(mapResultCodeToHttpExtension(user.status));
  }
}


