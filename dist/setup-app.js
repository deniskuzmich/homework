"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const testing_router_1 = require("./routers/testing-router/testing.router");
const blog_router_1 = require("./routers/blog.router");
const post_router_1 = require("./routers/post.router");
const paths_1 = require("./core/paths/paths");
const http_statuses_1 = require("./core/http_statuses/http_statuses");
const users_router_1 = require("./routers/users.router");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.get("/", (req, res) => {
        res.status(http_statuses_1.HTTP_STATUSES.OK_200).send("Blogs and Posts");
    });
    app.use(paths_1.USERS_PATH, users_router_1.usersRouter);
    app.use(paths_1.TESTING_PATH, testing_router_1.testingRouter);
    app.use(paths_1.BLOGS_PATH, blog_router_1.blogRouter);
    app.use(paths_1.POSTS_PATH, post_router_1.postRouter);
    return app;
};
exports.setupApp = setupApp;
