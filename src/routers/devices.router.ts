import {Router} from "express";
import {deleteAllDevicesHandler, deleteOneDeviceHandler, getDevicesHandler} from "../core/composition/composition-root";

export const devicesRouter = Router()
  .get('/devices', getDevicesHandler.getDevices)
  .delete('/devices/', deleteAllDevicesHandler.delete)
  .delete('/devices/:deviceId',  deleteOneDeviceHandler.deleteOne)
