"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const http_statuses_1 = require("../http_statuses/http_statuses");
const posts_repository_1 = require("../respositories/posts-repository");
exports.postRouter = (0, express_1.Router)();
exports.postRouter.get("", (req, res) => {
    var _a;
    const postsBlogs = posts_repository_1.postsRepository.findPosts((_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString());
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(postsBlogs);
});
exports.postRouter.get('/:id', (req, res) => {
    const post = posts_repository_1.postsRepository.getPostById(req.params.id);
    if (!post) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(post);
});
exports.postRouter.put('/:id', (req, res) => {
    const post = posts_repository_1.postsRepository.updatePost(req.params.id, req.body);
    if (!post) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
exports.postRouter.post("", (req, res) => {
    const newPost = posts_repository_1.postsRepository.createPost(req.body);
    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newPost);
});
exports.postRouter.delete('/:id', (req, res) => {
    const deletedPost = posts_repository_1.postsRepository.deletePost(req.params.id);
    if (deletedPost) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
});
