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
exports.UpdateCommentsHandler = void 0;
const result_status_1 = require("../../common/types/result.status");
const mapResultCodeToHttpExtention_1 = require("../../common/mapper/mapResultCodeToHttpExtention");
class UpdateCommentsHandler {
    constructor(commentsService) {
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const commentId = req.params.commentId;
            const content = req.body.content;
            const userId = req.user.userId;
            const updatedComment = yield this.commentsService.updateComment(commentId, content, userId);
            if (updatedComment.status !== result_status_1.ResultStatus.NoContent) {
                return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(updatedComment.status)).send(updatedComment.extensions);
            }
            return res.sendStatus((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(updatedComment.status));
        });
        this.commentsService = commentsService;
    }
}
exports.UpdateCommentsHandler = UpdateCommentsHandler;
