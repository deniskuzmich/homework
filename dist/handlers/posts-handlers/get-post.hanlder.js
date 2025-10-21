"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostHandler = getPostHandler;
const posts_repository_1 = require("../../respositories/posts-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
function getPostHandler(req, res) {
    const post = posts_repository_1.postsRepository.getPostById(req.params.id);
    if (!post) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(post);
}
