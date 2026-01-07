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
exports.EmailResendingHandler = void 0;
const mapResultCodeToHttpExtention_1 = require("../../../common/mapper/mapResultCodeToHttpExtention");
const result_status_1 = require("../../../common/types/result.status");
const composition_root_1 = require("../../../core/composition/composition-root");
class EmailResendingHandler {
    resending(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield composition_root_1.authService.resendEmail(req.body.email);
            if (result.status !== result_status_1.ResultStatus.NoContent) {
                return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(result.status)).send({ errorsMessages: result.extensions });
            }
            return res.sendStatus((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(result.status));
        });
    }
}
exports.EmailResendingHandler = EmailResendingHandler;
