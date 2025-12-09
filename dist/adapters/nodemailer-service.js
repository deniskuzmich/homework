"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodemailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.nodemailerService = {
    sendEmail(email, code, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let transport = nodemailer_1.default.createTransport({
                service: 'Mail.ru',
                auth: {
                    user: 'kuzmich-denis@mail.ru',
                    pass: 'rtgh765iop90',
                }
            });
            let info = yield transport.sendMail({
                from: 'Denis',
                to: email,
                subject: code,
                html: message
            });
            return info;
        });
    }
};
// `<div>
//            <h1>HI MAN, YO</h1>
//            <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
//       </div>
//     `,
