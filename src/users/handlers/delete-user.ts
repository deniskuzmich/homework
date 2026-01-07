import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {usersService} from "../../core/composition/composition-root";


export class DeleteUserHandler {
  async delete (req: Request, res: Response) {
    const user = await usersService.getUserById(req.params.id);
    if (!user) {
      res.sendStatus(HttpStatuses.NotFound);
    }

    await usersService.deleteUser(req.params.id);
    return res.sendStatus(HttpStatuses.NoContent);
  }
}

