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
exports.getPostHandler = getPostHandler;
const map_to_post_view_model_1 = require("../mapper/map-to-post-view-model");
const posts_service_1 = require("../service/posts.service");
const http_statuses_1 = require("../../common/types/http-statuses");
function getPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield posts_service_1.postsService.getPostById(req.params.id);
            if (!post) {
                return res.sendStatus(http_statuses_1.HttpStatuses.NotFound);
            }
            const postViewModel = (0, map_to_post_view_model_1.mapToPostViewModel)(post);
            res.status(http_statuses_1.HttpStatuses.Success).send(postViewModel);
        }
        catch (e) {
            return res.sendStatus(http_statuses_1.HttpStatuses.ServerError);
        }
    });
}
