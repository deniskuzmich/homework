import {Router} from "express";
import {container} from "../core/ioc/ioc";
import {GetDevicesHandler} from "../devices/handler/get-devices.handler";
import {DeleteAllDevicesHandler} from "../devices/handler/delete-all-devices.handler";
import {DeleteOneDeviceHandler} from "../devices/handler/delete-one-device.handler";

const getDevicesHandler = container.get(GetDevicesHandler);
const deleteAllDevicesHandler = container.get(DeleteAllDevicesHandler);
const deleteOneDeviceHandler = container.get(DeleteOneDeviceHandler);

export const devicesRouter = Router()
  .get('/devices', getDevicesHandler.getDevices.bind(getDevicesHandler))
  .delete('/devices/', deleteAllDevicesHandler.delete.bind(deleteAllDevicesHandler))
  .delete('/devices/:deviceId',  deleteOneDeviceHandler.deleteOne.bind(deleteOneDeviceHandler))
