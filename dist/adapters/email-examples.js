"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailExamples = void 0;
exports.emailExamples = {
    registrationEmail(code) {
        return ` <h1>Thanks for your registration</h1>
 <p>To finish registration please follow the link below:
     <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
 </p>`;
    },
    passwordRecovery(code) {
        return `<h1>Password recovery</h1>
    <p>To finish password recovery please follow the link below:
      <a href='https://somesite.com/password-recovery?recoveryCode=${code}'>recovery password</a>
    </p>`;
    }
};
