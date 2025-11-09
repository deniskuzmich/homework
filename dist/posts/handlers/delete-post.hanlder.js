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
exports.deletePostHanlder = deletePostHanlder;
const http_statuses_1 = require("../../core/http_statuses/http_statuses");
const posts_service_1 = require("../service/posts.service");
function deletePostHanlder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield posts_service_1.postsService.getPostById(req.params.id);
            if (!post) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
            yield posts_service_1.postsService.deletePost(req.params.id);
            return res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
        }
        catch (e) {
            res.sendStatus(http_statuses_1.HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
        }
    });
}
