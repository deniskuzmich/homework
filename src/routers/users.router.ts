import {Router} from "express";
import {userInputDtoValidation} from "../users/middleware-validation/users.pagination-validation";
import {superAdminGuardMiddleware} from "../auth/auth-admin/super-admin.guard.middleware";
import {idValidation} from "../common/middleware-validation/id.validation-middleware";
import {paginationValidation} from "../common/validation/pagination-validation";
import {userInputValidation} from "../users/middleware-validation/users-input.validation";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {container} from "../core/ioc/ioc";
import {GetAllUsers} from "../users/handlers/get-all-users";
import {CreateUserHandler} from "../users/handlers/create-user";
import {DeleteUserHandler} from "../users/handlers/delete-user";

const getAllUsers = container.get(GetAllUsers);
const createUserHandler = container.get(CreateUserHandler);
const deleteUserHandler = container.get(DeleteUserHandler);

export const usersRouter = Router();
usersRouter
  .get("",
    superAdminGuardMiddleware,
    userInputDtoValidation,
    paginationValidation,
    inputValidationResultMiddleware,
    getAllUsers.getAll.bind(getAllUsers))

  .post("",
    superAdminGuardMiddleware,
    userInputValidation,
    inputValidationResultMiddleware,
    createUserHandler.createUser.bind(createUserHandler))

  .delete('/:id',
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteUserHandler.delete.bind(deleteUserHandler))