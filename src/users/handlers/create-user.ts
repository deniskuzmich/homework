import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {UsersQueryRepository} from "../repository/users-query.repository";
import {UsersService} from "../service/users.service";


export class CreateUserHandler {
  usersQueryRepository: UsersQueryRepository;
  usersService: UsersService;

  constructor(usersQueryRepository: UsersQueryRepository, usersService: UsersService) {
    this.usersQueryRepository = usersQueryRepository;
    this.usersService = usersService;
  }

  createUser = async (req: Request, res: Response) => {
    const result = await this.usersService.createUser(req.body);

    if ("errorsMessages" in result) {
      return res.status(HttpStatuses.BadRequest).send(result);
    }

    const userViewModel = await this.usersQueryRepository.getUserById(result._id.toString())
    return res.status(HttpStatuses.Created).send(userViewModel);
  }
}

