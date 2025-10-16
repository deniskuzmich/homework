import {db} from "../../db/in-memory.db.";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";
import {Router} from "express";

export const testingRouter = Router();

testingRouter.delete('/all-data', (req, res) => {
  db.videos = [],
  db.blogs = [],
  db.posts = []
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
