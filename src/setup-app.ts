import express, {Express} from "express";
import {videoRouter} from "./routers/video.router";
import {testingRouter} from "./routers/testing-router/testing.router";
import {blogRouter} from "./routers/blog.router";
import {postRouter} from "./routers/post.router";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.use('/testing', testingRouter);
  app.use('/videos', videoRouter);
  app.use('/blogs', blogRouter);
  app.use('/posts', postRouter);

  return app;
};