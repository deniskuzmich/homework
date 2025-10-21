import express, { Express } from "express";
import { testingRouter } from "./routers/testing-router/testing.router";
import { blogRouter } from "./routers/blog.router";
import { postRouter } from "./routers/post.router";
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH } from "./core/paths/paths";
import {HTTP_STATUSES} from "./http_statuses/http_statuses";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(HTTP_STATUSES.OK_200).send("Blogs and Posts");
  });

  app.use(TESTING_PATH, testingRouter);
  app.use(BLOGS_PATH, blogRouter);
  app.use(POSTS_PATH, postRouter);

  return app;
};
