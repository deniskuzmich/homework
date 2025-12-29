import {NextFunction, Request, Response} from "express";
import {requestLogCollection} from "../../db/mongo.db";
import {HttpStatuses} from "../../common/types/http-statuses";

export const requestCountMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  const dateTenSecondAgo = new Date(Date.now() - 10000);

  const requestCount = await requestLogCollection.countDocuments({
    IP: req.ip,
    URL: req.originalUrl,
    date: {$gte: dateTenSecondAgo}
  })

  if (requestCount >= 5) {
    return res.sendStatus(HttpStatuses.TooManyRequests)
  }
  next()
}