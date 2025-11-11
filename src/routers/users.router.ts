import {Router} from "express";
import {userInputDtoValidation} from "../users/middleware-validation/users.pagination-validation";
import {getAllUsers} from "../users/handlers/get-all-users";
import {superAdminGuardMiddleware} from "../auth/super-admin.guard.middleware";
import {createUserHandler} from "../users/handlers/post-user";
import {idValidation} from "../core/middleware-validation/id.validation-middleware";
import {deleteUserHandler} from "../users/handlers/delete-user";

export const usersRouter = Router();

usersRouter
  .get("", superAdminGuardMiddleware, userInputDtoValidation, getAllUsers)

  .post("", superAdminGuardMiddleware, createUserHandler)

  .delete('/:id', superAdminGuardMiddleware,  idValidation, deleteUserHandler )