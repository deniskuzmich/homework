import {db} from "../db/videos";
import {HTTP_STATUSES} from "../http_statuses/http_statuses";
import {Router} from "express";

export const testingRouter = Router();

testingRouter.delete('', (req, res) => {
  db.videos = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})