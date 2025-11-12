import {Request, Response} from "express";

export async function loginUserHandler(req: Request, res: Response) {
  const loginOrEmail = req.body.loginOrEmail;
  const password = req.body.password;

}