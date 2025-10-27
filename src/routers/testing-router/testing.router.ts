import {HTTP_STATUSES} from "../../http_statuses/http_statuses";
import {Router, Request, Response} from "express";
import {blogsCollection, postsCollection} from "../../db/mongo.db";

export const testingRouter = Router();

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await Promise.all([
    blogsCollection.deleteMany(),
    postsCollection.deleteMany(),
  ]);
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
