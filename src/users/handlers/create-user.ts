import {Request, Response} from "express";
import {usersService} from "../service/users.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {usersQueryRepository} from "../repository/users-query.repository";

export async function createUserHandler (req: Request, res: Response) {
  const result = await usersService.createUser(req.body);

  if ("errorsMessages" in result) {
   return  res.status(HttpStatuses.BadRequest).send(result);
  }

  const userViewModel = await usersQueryRepository.getUserById(result._id.toString())
  return res.status(HttpStatuses.Created).send(userViewModel);
}

