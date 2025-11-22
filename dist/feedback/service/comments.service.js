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
exports.commentsService = void 0;
const comments_query_repository_1 = require("../repository/comments-query.repository");
const result_status_1 = require("../../common/types/result.status");
const comments_repository_1 = require("../repository/comments.repository");
exports.commentsService = {
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comments_query_repository_1.commentsQueryRepository.getCommentById(id);
            if (!comment) {
                return {
                    status: result_status_1.ResultStatus.NotFound,
                    extensions: [],
                    data: null
                };
            }
            return {
                status: result_status_1.ResultStatus.Success,
                extensions: [],
                data: comment
            };
        });
    },
    updateComment(id, newContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comments_query_repository_1.commentsQueryRepository.getCommentById(id);
            if (!comment) {
                return {
                    status: result_status_1.ResultStatus.NotFound,
                    extensions: [],
                    data: null
                };
            }
            const updatedComment = yield comments_repository_1.commentsRepository.updateComment(id, newContent);
            if (updatedComment) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'content', message: 'Bad request to update comment' }],
                    data: null
                };
            }
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: null
            };
        });
    }
};
