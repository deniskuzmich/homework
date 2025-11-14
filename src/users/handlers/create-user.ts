import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {mapToUserViewModel} from "../mapper/map-to-user-view-model";
import {usersService} from "../service/users.service";


export async function createUserHandler (req: Request, res: Response) {
  const result = await usersService.createUser(req.body);

  if ("errorsMessages" in result) {
   return  res.status(HTTP_STATUSES.BAD_REQUEST_400).send(result);
  }

  const userViewModel = mapToUserViewModel(result);
  return res.status(HTTP_STATUSES.CREATED_201).send(userViewModel);
}