import { Request, Response } from "express";
import {usersService} from "../service/users.service";
import {UserQueryInput} from "../types/input-types/user-query-input.type";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";


export async function getAllUsers(req: Request, res: Response) {
  const queryInput: UserQueryInput  = req.query

  const usersList = await usersService.getAllUsers(queryInput)
  res.status(HTTP_STATUSES.OK_200).send(usersList);
}