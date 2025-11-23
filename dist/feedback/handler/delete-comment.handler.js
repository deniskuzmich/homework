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
exports.deleteCommentHandler = deleteCommentHandler;
const comments_service_1 = require("../service/comments.service");
const result_status_1 = require("../../common/types/result.status");
const mapResultCodeToHttpExtention_1 = require("../../common/mapper/mapResultCodeToHttpExtention");
const http_statuses_1 = require("../../common/types/http-statuses");
function deleteCommentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedComment = yield comments_service_1.commentsService.getCommentById(req.params.id);
        if (deletedComment.status !== result_status_1.ResultStatus.NoContent) {
            return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(deletedComment.status)).send(deletedComment.extensions);
        }
        yield comments_service_1.commentsService.deleteComment(req.params.id);
        return res.sendStatus(http_statuses_1.HttpStatuses.NoContent);
    });
}
