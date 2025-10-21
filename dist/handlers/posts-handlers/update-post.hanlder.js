"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostHanlder = updatePostHanlder;
const posts_repository_1 = require("../../respositories/posts-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
function updatePostHanlder(req, res) {
    const post = posts_repository_1.postsRepository.updatePost(req.params.id, req.body);
    if (!post) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
}
