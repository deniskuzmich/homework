import {Request, Response} from "express";
import {mapToUserViewModel} from "../mapper/map-to-user-view-model";
import {usersService} from "../service/users.service";
import {HttpStatuses} from "../../common/types/http-statuses";


export async function createUserHandler (req: Request, res: Response) {
  const result = await usersService.createUser(req.body);

  if ("errorsMessages" in result) {
   return  res.status(HttpStatuses.BadRequest).send(result);
  }

  const userViewModel = mapToUserViewModel(result);
  return res.status(HttpStatuses.Created).send(userViewModel);
}

//create export const valuesPaginationMaperForUsers = (query: QueryInputForPagination): BlogInputWithoutSearch => {
//   return {
//     pageNumber: query.pageNumber ? Number(query.pageNumber) : 1,
//     pageSize: query.pageSize ? Number(query.pageSize) : 10,
//     sortBy: query.sortBy ?? 'createdAt',
//     sortDirection: query.sortDirection ?? 'desc',
//   }
// }