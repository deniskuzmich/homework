import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {UsersService} from "../service/users.service";
import {inject, injectable} from "inversify";

@injectable()
export class DeleteUserHandler {

  constructor(
    @inject(UsersService)
    public usersService: UsersService) {
  }

  async delete (req: Request, res: Response) {
    const user = await this.usersService.getUserById(req.params.id);
    if (!user) {
      res.sendStatus(HttpStatuses.NotFound);
    }

    await this.usersService.deleteUser(req.params.id);
    return res.sendStatus(HttpStatuses.NoContent);
  }
}

