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
exports.NodemailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class NodemailerService {
    sendEmail(email, message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('mail', process.env.EMAIL_USER);
            console.log('password', process.env.EMAIL_APP_PASSWORD);
            let transport = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_APP_PASSWORD,
                }
            });
            let info = yield transport.sendMail({
                from: `"Denis" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Test',
                html: message
            });
            return info;
        });
    }
}
exports.NodemailerService = NodemailerService;
