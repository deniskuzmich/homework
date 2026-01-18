import {NextFunction, Request, Response} from "express";
import {RequestsModel} from "../../entity/requests.entity";


export const requestLoggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await RequestsModel.insertOne({
    IP: req.ip,
    URL: req.originalUrl,
    date: new Date()
  })
  next()
}