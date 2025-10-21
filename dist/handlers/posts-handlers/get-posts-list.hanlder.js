"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsListHanlder = getPostsListHanlder;
const posts_repository_1 = require("../../respositories/posts-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
function getPostsListHanlder(req, res) {
    var _a;
    const postsBlogs = posts_repository_1.postsRepository.findPosts((_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString());
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(postsBlogs);
}
