import { Request, Response } from "express";
import {usersService} from "../service/users.service";
import {UserQueryInput} from "../types/input-types/user-query-input.type";
import {ResultStatus} from "../../common/types/result.status";


export async function getAllUsers(req: Request, res: Response) {
  const queryInput: UserQueryInput  = req.query

  const usersList = await usersService.getAllUsers(queryInput)
  res.status(ResultStatus.Success).send(usersList);
}