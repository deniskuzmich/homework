import express, {Express} from "express";
import {videoRouter} from "./routers/video.router";
import {testingRouter} from "./routers/testing.router";

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  app.use('/hometask_01/api/videos', videoRouter);
  app.use('/hometask_01/api/testing/all-data', testingRouter);
  return app;
};