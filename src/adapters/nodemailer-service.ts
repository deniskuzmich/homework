import nodemailer from "nodemailer";
import {injectable} from "inversify";

@injectable()
export class NodemailerService {
  async sendEmail(email: string, message: string) {
    console.log('mail', process.env.EMAIL_USER);
    console.log('password', process.env.EMAIL_APP_PASSWORD);
    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      }
    });

    let info = await transport.sendMail({
      from: `"Denis" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Test',
      html: message
    });
    return info
  }
}