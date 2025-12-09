import nodemailer from "nodemailer";

export const nodemailerService = {
  async sendEmail(email: string, code: string, message: string) {
    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kuzmichdenis21@gmail.com',
        pass: 'utzglaowipftlbsr',
      }
    });

    let info = await transport.sendMail({
      from: '"Denis" <kuzmichdenis21@gmail.com>',
      to: email,
      subject: code,
      html: message
    });
    return info
  }
}