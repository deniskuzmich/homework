import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {usersQueryRepository, usersService} from "../../core/composition/composition-root";


export class CreateUserHandler {
  async createUser(req: Request, res: Response) {
    const result = await usersService.createUser(req.body);

    if ("errorsMessages" in result) {
      return  res.status(HttpStatuses.BadRequest).send(result);
    }

    const userViewModel = await usersQueryRepository.getUserById(result._id.toString())
    return res.status(HttpStatuses.Created).send(userViewModel);
  }
}

