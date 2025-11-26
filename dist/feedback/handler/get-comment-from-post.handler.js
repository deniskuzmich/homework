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
exports.getCommentForPostHandler = getCommentForPostHandler;
const comments_service_1 = require("../service/comments.service");
const http_statuses_1 = require("../../common/types/http-statuses");
const result_status_1 = require("../../common/types/result.status");
const mapResultCodeToHttpExtention_1 = require("../../common/mapper/mapResultCodeToHttpExtention");
function getCommentForPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.query;
        const comment = yield comments_service_1.commentsService.getCommentByPostId(req.params.postId, query);
        if (comment.status === result_status_1.ResultStatus.NotFound) {
            return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(comment.status)).send(comment.extensions);
        }
        res.status(http_statuses_1.HttpStatuses.Success).send(comment.data);
    });
}
