import nodemailer from "nodemailer";

export const nodemailerService = {
  async sendEmail(email: string, code: string, message: string) {
    let transport = nodemailer.createTransport({
      service: 'Mail.ru',
      auth: {
        user: 'kuzmich-denis@mail.ru',
        pass: 'rtgh765iop90',
      }
    });

    let info = await transport.sendMail({
      from: 'Denis',
      to: email,
      subject: code,
      html: message
    });
    return info
  }
}

// `<div>
//            <h1>HI MAN, YO</h1>
//            <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
//       </div>
//     `,