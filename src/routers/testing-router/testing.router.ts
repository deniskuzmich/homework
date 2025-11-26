import {Router, Request, Response} from "express";
import {blogsCollection, postsCollection, usersCollection} from "../../db/mongo.db";
import {HttpStatuses} from "../../common/types/http-statuses";

export const testingRouter = Router();

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await Promise.all([
    blogsCollection.deleteMany(),
    postsCollection.deleteMany(),
    usersCollection.deleteMany(),
  ]);
  res.sendStatus(HttpStatuses.NoContent);
});
