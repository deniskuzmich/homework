import {Router, Request, Response} from "express";
import {
  // blogsCollection,
  commentsCollection,
  // postsCollection,
  sessionsCollection,
  usersCollection

} from "../../db/mongo.db";

import {HttpStatuses} from "../../common/types/http-statuses";
import {BlogModel} from "../../entity/blogs.entity";
import {PostModel} from "../../entity/posts.entity";

export const testingRouter = Router();

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await Promise.all([
    BlogModel.deleteMany(),
    PostModel.deleteMany(),
    // blogsCollection.deleteMany(),
    // postsCollection.deleteMany(),
    usersCollection.deleteMany(),
    commentsCollection.deleteMany(),
    sessionsCollection.deleteMany(),
  ]);
  res.sendStatus(HttpStatuses.NoContent);
});
