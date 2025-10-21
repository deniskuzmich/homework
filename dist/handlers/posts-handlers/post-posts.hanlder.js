"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPostsHandler = postPostsHandler;
const posts_repository_1 = require("../../respositories/posts-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
function postPostsHandler(req, res) {
    const newPost = posts_repository_1.postsRepository.createPost(req.body);
    if (!newPost) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
    }
    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newPost);
}
