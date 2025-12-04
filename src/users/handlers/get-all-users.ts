import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {parseQueryInputForUsers} from "../mapper/parse-query-input";
import {usersQueryRepository} from "../repository/users-query.repository";


export async function getAllUsers(req: Request, res: Response) {
  const queryInput = parseQueryInputForUsers(req.query)

  const usersList = await usersQueryRepository.getAllUsers(queryInput)
  res.status(HttpStatuses.Success).send(usersList);
}
