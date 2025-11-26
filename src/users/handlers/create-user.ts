import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {mapToUserViewModel} from "../mapper/map-to-user-view-model";
import {usersService} from "../service/users.service";
import {HttpStatuses} from "../../common/types/http-statuses";


export async function createUserHandler (req: Request, res: Response) {
  const result = await usersService.createUser(req.body);

  if ("errorsMessages" in result) {
   return  res.status(HttpStatuses.BadRequest).send(result);
  }

  const userViewModel = mapToUserViewModel(result);
  return res.status(HttpStatuses.Created).send(userViewModel);
}