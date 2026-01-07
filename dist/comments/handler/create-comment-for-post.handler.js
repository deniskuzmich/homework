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
exports.CreateCommentForPostHandler = void 0;
const http_statuses_1 = require("../../common/types/http-statuses");
const result_status_1 = require("../../common/types/result.status");
const mapResultCodeToHttpExtention_1 = require("../../common/mapper/mapResultCodeToHttpExtention");
const composition_root_1 = require("../../core/composition/composition-root");
class CreateCommentForPostHandler {
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const content = req.body.content;
            const postId = req.params.id;
            if (!content || !user) {
                return res.sendStatus(http_statuses_1.HttpStatuses.BadRequest);
            }
            if (!postId) {
                return res.sendStatus(http_statuses_1.HttpStatuses.NotFound);
            }
            const createdComment = yield composition_root_1.commentsService.createCommentForPost(user, content, postId);
            if (createdComment.status !== result_status_1.ResultStatus.Created) {
                return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(createdComment.status)).send(createdComment.extensions);
            }
            const commentForPost = yield composition_root_1.commentsQueryRepository.getCommentById(createdComment.data._id.toString());
            return res.status(http_statuses_1.HttpStatuses.Created).send(commentForPost);
        });
    }
}
exports.CreateCommentForPostHandler = CreateCommentForPostHandler;
