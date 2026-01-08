import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {UsersService} from "../service/users.service";


export class DeleteUserHandler {
  usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  delete = async (req: Request, res: Response) => {
    const user = await this.usersService.getUserById(req.params.id);
    if (!user) {
      res.sendStatus(HttpStatuses.NotFound);
    }

    await this.usersService.deleteUser(req.params.id);
    return res.sendStatus(HttpStatuses.NoContent);
  }
}

