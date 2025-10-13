import express, {Express} from "express";
import {videoRouter} from "./routers/video.router";
import {testingRouter} from "./routers/testing.router";

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  app.use('/videos', videoRouter);
  app.use('/testing', testingRouter);
  return app;
};