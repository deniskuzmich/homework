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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistrationHandler = void 0;
const result_status_1 = require("../../../common/types/result.status");
const mapResultCodeToHttpExtention_1 = require("../../../common/mapper/mapResultCodeToHttpExtention");
const composition_root_1 = require("../../../core/composition/composition-root");
class UserRegistrationHandler {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = req.body.login;
            const email = req.body.email;
            const password = req.body.password;
            const user = yield composition_root_1.authService.registerUser(login, email, password);
            if (user.status !== result_status_1.ResultStatus.NoContent) {
                return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(user.status)).send({ errorsMessages: user.extensions });
            }
            return res.sendStatus((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(user.status));
        });
    }
}
exports.UserRegistrationHandler = UserRegistrationHandler;
