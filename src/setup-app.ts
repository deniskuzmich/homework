import express, { Express } from "express";
import { testingRouter } from "./routers/testing-router/testing.router";
import { blogRouter } from "./routers/blog.router";
import { postRouter } from "./routers/post.router";
import {AUTH_PATH, BLOGS_PATH, POSTS_PATH, TESTING_PATH, USERS_PATH} from "./core/paths/paths";
import {HTTP_STATUSES} from "./core/http_statuses/http_statuses";
import {usersRouter} from "./routers/users.router";
import {authRouter} from "./routers/auth.router";

export const setupApp = (app: Express) => {
  app.use(express.json());
  app.get("/", (req, res) => {
    res.status(HTTP_STATUSES.OK_200).send("Blogs and Posts");
  });

  app.use(AUTH_PATH, authRouter);
  app.use(USERS_PATH, usersRouter)
  app.use(TESTING_PATH, testingRouter);
  app.use(BLOGS_PATH, blogRouter);
  app.use(POSTS_PATH, postRouter);

  return app;
};
