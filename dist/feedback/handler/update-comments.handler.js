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
const comments_query_repository_1 = require("../repository/comments-query.repository");
const users_service_1 = require("../../users/service/users.service");
function updateCommentsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentId = req.params.commentId;
        const content = req.body.content;
        const userId = req.params.userId;
        const comment = yield comments_query_repository_1.commentsQueryRepository.getCommentById(commentId);
        if (!comment) {
            return res.sendStatus(http_statuses_1.HttpStatuses.NotFound);
        }
        const userDb = yield users_service_1.usersService.getUserById(req.user.userId);
        if (!userDb) {
            return res.sendStatus(http_statuses_1.HttpStatuses.NotFound);
        }
        if (comment.commentatorInfo.userId !== userDb._id.toString()) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Forbidden);
        }
        const updatedComment = yield comments_service_1.commentsService.updateComment(commentId, content, userId);
        if (updatedComment.status !== result_status_1.ResultStatus.NoContent) {
            return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(updatedComment.status)).send(updatedComment.extensions);
        }
        return res.sendStatus((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(updatedComment.status));
    });
}
