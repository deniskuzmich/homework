import * as mongoose from "mongoose";
import {model, Model} from "mongoose";
import {RequestLogType} from "../devices/types/request-count.type";

const RequestsSchema = new mongoose.Schema<RequestLogType> ({
  IP: {type: String},
  URL: {type: String},
  date: {type: Date},
})

type RequestsModel = Model<RequestLogType>

export const RequestsModel = model<RequestLogType, RequestsModel>('requestCount', RequestsSchema);