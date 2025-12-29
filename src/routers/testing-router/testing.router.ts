import {Router, Request, Response} from "express";
import {
  blogsCollection,
  commentsCollection,
  postsCollection,
  sessionsCollection,
  usersCollection
} from "../../db/mongo.db";
import {HttpStatuses} from "../../common/types/http-statuses";

export const testingRouter = Router();

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await Promise.all([
    blogsCollection.deleteMany(),
    postsCollection.deleteMany(),
    usersCollection.deleteMany(),
    commentsCollection.deleteMany(),
    sessionsCollection.deleteMany(),
  ]);
  res.sendStatus(HttpStatuses.NoContent);
});
