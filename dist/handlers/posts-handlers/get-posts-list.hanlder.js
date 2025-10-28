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
exports.getPostsListHanlder = getPostsListHanlder;
const posts_repository_1 = require("../../respositories/posts-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
const map_to_post_view_model_1 = require("../mappers/map-to-post-view-model");
function getPostsListHanlder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundPosts = yield posts_repository_1.postsRepository.findPosts();
            const blogsViewModel = foundPosts.map(map_to_post_view_model_1.mapToPostViewModel);
            res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(blogsViewModel);
        }
        catch (e) {
            res.sendStatus(http_statuses_1.HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
        }
    });
}
