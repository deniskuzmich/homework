import {AuthService} from "../../service/auth-service";
import {Request, Response} from "express";

export class PasswordRecovery {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  recover = async (req: Request, res: Response) => {
    const email = req.body.email;

    const result = await this.authService.passwordRecovery(req.body.email);
  }
}

