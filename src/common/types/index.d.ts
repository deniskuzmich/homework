import "express";
import {UserDbType} from "../../users/types/main-types/user-db-type";

declare global {
  namespace Express {
    interface Request {
      userId: string | null;
      user: UserDbType | null
    }
  }
}