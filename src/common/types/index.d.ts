import "express";
import {UserInfoType} from "../../users/types/output-types/user-info.type";

declare global {
  namespace Express {
    interface Request {
      user: UserInfoType | null
    }
  }
}