import nodemailer from "nodemailer";

export class NodemailerService {
  async sendEmail(email: string, message: string) {
    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      }
      // host: 'smtp.yandex.ru',
      // port: 587,
      // secure: false, // STARTTLS
      // auth: {
      //   user: process.env.MAIL_USER,
      //   pass: process.env.MAIL_APP_PASSWORD,
      // },
      // tls: {
      //   rejectUnauthorized: false,
      // },
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


// let transport = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   }
// });
//
// let info = await transport.sendMail({
//   from: '"Denis" <kuzmichdenis21@gmail.com>',
//   to: email,
//   subject: 'Test Registration',
//   html: message
// });
// return info
// }