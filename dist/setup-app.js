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
const users_router_1 = require("./routers/users.router");
const auth_router_1 = require("./routers/auth.router");
const comments_router_1 = require("./routers/comments.router");
const http_statuses_1 = require("./common/types/http-statuses");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const security_router_1 = require("./routers/security.router");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.get("/", (req, res) => {
        res.status(http_statuses_1.HttpStatuses.Success).send("IT-INCUBATOR");
    });
    app.use(paths_1.AUTH_PATH, auth_router_1.authRouter);
    app.use(paths_1.SECURITY_PATH, security_router_1.securityRouter);
    app.use(paths_1.COMMENTS_PATH, comments_router_1.commentsRouter);
    app.use(paths_1.USERS_PATH, users_router_1.usersRouter);
    app.use(paths_1.TESTING_PATH, testing_router_1.testingRouter);
    app.use(paths_1.BLOGS_PATH, blog_router_1.blogRouter);
    app.use(paths_1.POSTS_PATH, post_router_1.postRouter);
    return app;
};
exports.setupApp = setupApp;
