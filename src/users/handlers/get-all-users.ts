import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {parseQueryInputForUsers} from "../mapper/parse-query-input";
import {UsersQueryRepository} from "../repository/users-query.repository";
import {inject, injectable} from "inversify";

@injectable()
export class GetAllUsers {

  constructor(
    @inject(UsersQueryRepository)
    public usersQueryRepository: UsersQueryRepository) {
  }

  async getAll(req: Request, res: Response) {
    const queryInput = parseQueryInputForUsers(req.query)

    const usersList = await this.usersQueryRepository.getAllUsers(queryInput)
    res.status(HttpStatuses.Success).send(usersList);
  }
}

