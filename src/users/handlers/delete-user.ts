import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../core/http_statuses/http_statuses";
import {usersService} from "../service/users.service";


export async function deleteUserHandler(req: Request, res: Response) {
  const user = await usersService.getUserById(req.params.id);
  if (!user) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }

  await usersService.deleteUser(req.params.id);
  return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}