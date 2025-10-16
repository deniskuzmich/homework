"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const video_router_1 = require("./routers/video.router");
const testing_router_1 = require("./routers/testing-router/testing.router");
const blog_router_1 = require("./routers/blog.router");
const post_router_1 = require("./routers/post.router");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.use('/testing', testing_router_1.testingRouter);
    app.use('/videos', video_router_1.videoRouter);
    app.use('/blogs', blog_router_1.blogRouter);
    app.use('/posts', post_router_1.postRouter);
    return app;
};
exports.setupApp = setupApp;
