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
exports.postPostsHandler = postPostsHandler;
const http_statuses_1 = require("../../core/http_statuses/http_statuses");
const map_to_post_view_model_1 = require("../mapper/map-to-post-view-model");
const posts_service_1 = require("../service/posts.service");
function postPostsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdPost = yield posts_service_1.postsService.createPost(req.body);
            if (!createdPost) {
                return res.sendStatus(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
            }
            const postViewModel = (0, map_to_post_view_model_1.mapToPostViewModel)(createdPost);
            res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(postViewModel);
        }
        catch (e) {
            res.status(http_statuses_1.HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
        }
    });
}
