import { NextFunction, Request, Response } from "express";
import { ResultStatus } from "../../common/types/result.status";
import {HttpStatuses} from "../../common/types/http-statuses";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "qwerty";

export const superAdminGuardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers["authorization"] as string;
  if (!auth) {
    res.sendStatus(HttpStatuses.Unauthorized);
    return;
  }

  const [authType, token] = auth.split(" ");
  if (authType !== "Basic") {
    res.sendStatus(HttpStatuses.Unauthorized);
    return;
  }

  const credentials = Buffer.from(token, "base64").toString("utf-8");
  const [username, password] = credentials.split(":");

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    res.sendStatus(HttpStatuses.Unauthorized);
    return;
  }

  next();
};
