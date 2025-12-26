import express, {Express} from "express";
import {testingRouter} from "./routers/testing-router/testing.router";
import {blogRouter} from "./routers/blog.router";
import {postRouter} from "./routers/post.router";
import {
  AUTH_PATH,
  BLOGS_PATH,
  COMMENTS_PATH,
  POSTS_PATH,
  SECURITY_PATH,
  TESTING_PATH,
  USERS_PATH
} from "./core/paths/paths";
import {usersRouter} from "./routers/users.router";
import {authRouter} from "./routers/auth.router";
import {commentsRouter} from "./routers/comments.router";
import {HttpStatuses} from "./common/types/http-statuses";
import cookieParser from "cookie-parser";
import {securityRouter} from "./routers/security.router";


export const setupApp = (app: Express) => {
  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (req, res) => {
    res.status(HttpStatuses.Success).send("IT-INCUBATOR");
  });

  app.use(AUTH_PATH, authRouter);
  app.use(SECURITY_PATH, securityRouter);
  app.use(COMMENTS_PATH, commentsRouter);
  app.use(USERS_PATH, usersRouter)
  app.use(TESTING_PATH, testingRouter);
  app.use(BLOGS_PATH, blogRouter);
  app.use(POSTS_PATH, postRouter);

  return app;
};
