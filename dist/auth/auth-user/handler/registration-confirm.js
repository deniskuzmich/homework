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
exports.registrationConfirmHandler = registrationConfirmHandler;
const auth_service_1 = require("../../service/auth-service");
const result_status_1 = require("../../../common/types/result.status");
const mapResultCodeToHttpExtention_1 = require("../../../common/mapper/mapResultCodeToHttpExtention");
function registrationConfirmHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield auth_service_1.authService.confirmEmail(req.body.code);
        if (result.status !== result_status_1.ResultStatus.Success) {
            return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(result.status)).send({ errorsMessages: result.extensions });
        }
        return res.sendStatus(204);
    });
}
