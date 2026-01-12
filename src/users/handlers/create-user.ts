import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {UsersQueryRepository} from "../repository/users-query.repository";
import {UsersService} from "../service/users.service";
import {inject, injectable} from "inversify";

@injectable()
export class CreateUserHandler {

  constructor(
    @inject(UsersQueryRepository)
    public usersQueryRepository: UsersQueryRepository,
    @inject(UsersService)
    public usersService: UsersService) {
  }

  async createUser (req: Request, res: Response) {
    const result = await this.usersService.createUser(req.body);

    if ("errorsMessages" in result) {
      return res.status(HttpStatuses.BadRequest).send(result);
    }

    const userViewModel = await this.usersQueryRepository.getUserById(result._id.toString())
    return res.status(HttpStatuses.Created).send(userViewModel);
  }
}

