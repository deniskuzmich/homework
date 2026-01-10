import nodemailer from "nodemailer";

export class NodemailerService {
  async sendEmail(email: string, message: string) {
    console.log('mail', process.env.EMAIL_USER);
    console.log('mail', process.env.EMAIL_APP_PASSWORD);
    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kuzmichdenis21@gmail.com',
        pass: 'diopzqaonsluurll',
      }
    });

    let info = await transport.sendMail({
      from: `"Denis" <kuzmichdenis21@gmail.com>`,
      to: email,
      subject: 'Test',
      html: message
    });
    return info
  }
}