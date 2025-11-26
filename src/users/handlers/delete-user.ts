import { Request, Response } from "express";
import { ResultStatus } from "../../common/types/result.status";
import {usersService} from "../service/users.service";
import {HttpStatuses} from "../../common/types/http-statuses";


export async function deleteUserHandler(req: Request, res: Response) {
  const user = await usersService.getUserById(req.params.id);
  if (!user) {
    res.sendStatus(HttpStatuses.NotFound);
  }

  await usersService.deleteUser(req.params.id);
  return res.sendStatus(HttpStatuses.NoContent);
}