"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPostsHandler = postPostsHandler;
const posts_repository_1 = require("../../respositories/posts-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
const in_memory_db_1 = require("../../db/in-memory.db.");
function postPostsHandler(req, res) {
    const blog = in_memory_db_1.db.blogs.find((b) => b.id === req.body.blogId);
    if (!blog)
        return null;
    const newPost = {
        id: (in_memory_db_1.db.posts.length ? in_memory_db_1.db.posts[in_memory_db_1.db.posts.length - 1].id + 1 : 1).toString(),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: blog.name,
    };
    if (!newPost) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
    }
    posts_repository_1.postsRepository.createPost(newPost);
    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newPost);
}
