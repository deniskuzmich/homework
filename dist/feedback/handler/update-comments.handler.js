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
exports.updateCommentsHandler = updateCommentsHandler;
const comments_service_1 = require("../service/comments.service");
const http_statuses_1 = require("../../common/types/http-statuses");
const result_status_1 = require("../../common/types/result.status");
const mapResultCodeToHttpExtention_1 = require("../../common/mapper/mapResultCodeToHttpExtention");
function updateCommentsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedComment = yield comments_service_1.commentsService.updateComment(req.params.id, req.body.content);
        if (updatedComment.status !== result_status_1.ResultStatus.NoContent) {
            return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(updatedComment.status)).send(updatedComment.extensions);
        }
        res.sendStatus(http_statuses_1.HttpStatuses.NoContent);
    });
}
