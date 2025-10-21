"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostHanlder = deletePostHanlder;
const posts_repository_1 = require("../../respositories/posts-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
function deletePostHanlder(req, res) {
    const deletedPost = posts_repository_1.postsRepository.deletePost(req.params.id);
    if (deletedPost) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
}
