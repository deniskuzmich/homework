import {Router} from "express";
import { Request, Response } from "express";
import {nodemailerService} from "../adapters/nodemailer-service";

export const emailRouter = Router();
emailRouter
  .post("/send", async (req: Request, res: Response) => {
    await nodemailerService.sendEmail(req.body.email, req.body.subject, req.body.message)
  })