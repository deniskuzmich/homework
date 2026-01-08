import nodemailer from "nodemailer";

export class NodemailerService {
  async sendEmail(email: string, message: string) {
    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    let info = await transport.sendMail({
      from: '"Denis" <kuzmichdenis21@gmail.com>',
      to: email,
      subject: 'Test Registration',
      html: message
    });
    return info
  }

  async sendPassword(email: string, message: string) {
    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    let info = await transport.sendMail({
      from: '"Denis" <kuzmichdenis21@gmail.com>',
      to: email,
      subject: 'Password Recovery',
      html: message
    });
    return info
  }
}

