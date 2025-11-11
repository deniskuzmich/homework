import {Request, Response} from "express";
import {usersRepository} from "../repository/users.repository";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {mapToUserViewModel} from "../mapper/map-to-user-view-model";
import {usersService} from "../service/users.service";


export async function createUserHandler (req: Request, res: Response) {
  const createdUser = await usersService.createUser(req.body);

  if (!createdUser) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400);
  }

  const userViewModel = mapToUserViewModel(createdUser);
  res.status(HTTP_STATUSES.CREATED_201).send(userViewModel);
}