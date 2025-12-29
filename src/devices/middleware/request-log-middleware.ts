import {NextFunction, Request, Response} from "express";
import {requestLogCollection} from "../../db/mongo.db";

export const requestLoggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await requestLogCollection.insertOne({
    IP: req.ip,
    URL: req.originalUrl,
    date: new Date()
  })
  next()
}