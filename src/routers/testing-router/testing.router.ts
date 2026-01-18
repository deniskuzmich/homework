import {Router, Request, Response} from "express";

import {HttpStatuses} from "../../common/types/http-statuses";
import {BlogModel} from "../../entity/blogs.entity";
import {PostModel} from "../../entity/posts.entity";
import {UserModel} from "../../entity/users.entity";
import {CommentModel} from "../../entity/comments.entity";
import {SessionModel} from "../../entity/sessions.entity";

export const testingRouter = Router();

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await Promise.all([
    BlogModel.deleteMany(),
    PostModel.deleteMany(),
    UserModel.deleteMany(),
    CommentModel.deleteMany(),
    SessionModel.deleteMany(),
  ]);
  res.sendStatus(HttpStatuses.NoContent);
});
