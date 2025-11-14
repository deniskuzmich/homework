import {Router} from "express";
import {userInputDtoValidation} from "../users/middleware-validation/users.pagination-validation";
import {getAllUsers} from "../users/handlers/get-all-users";
import {superAdminGuardMiddleware} from "../auth/super-admin.guard.middleware";
import {createUserHandler} from "../users/handlers/create-user";
import {idValidation} from "../core/middleware-validation/id.validation-middleware";
import {deleteUserHandler} from "../users/handlers/delete-user";
import {paginationValidation} from "../common/validation/pagination-validation";
import {userInputValidation} from "../users/middleware-validation/users-input.validation";
import {inputValidationResultMiddleware} from "../core/middleware-validation/input.validation-result.middleware";

export const usersRouter = Router();

usersRouter
  .get("", superAdminGuardMiddleware, userInputDtoValidation,paginationValidation, inputValidationResultMiddleware,getAllUsers)

  .post("", superAdminGuardMiddleware,userInputValidation, inputValidationResultMiddleware,createUserHandler)

  .delete('/:id', superAdminGuardMiddleware,  idValidation, inputValidationResultMiddleware,deleteUserHandler )