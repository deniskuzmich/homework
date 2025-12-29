import {Router} from "express";
import {getDevicesHandler} from "../devices/handler/get-devices.handler";
import {deleteAllDevicesHandler} from "../devices/handler/delete-all-devices.handler";
import {deleteOneDeviceHandler} from "../devices/handler/delete-one-device.handler";

export const securityRouter = Router()
  .get('/devices', getDevicesHandler)
  .delete('/devices/', deleteAllDevicesHandler)
  .delete('/devices/:deviceId',  deleteOneDeviceHandler)
