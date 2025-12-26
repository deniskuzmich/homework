"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityRouter = void 0;
const express_1 = require("express");
const get_devices_handler_1 = require("../devices/handler/get-devices.handler");
const delete_devices_handler_1 = require("../devices/handler/delete-devices.handler");
const delete_one_device_handler_1 = require("../devices/handler/delete-one-device.handler");
exports.securityRouter = (0, express_1.Router)()
    .get('/devices', get_devices_handler_1.getDevicesHandler)
    .delete('/devices/', delete_devices_handler_1.deleteAllDevicesHandler)
    .delete('/devices/:deviceId', delete_one_device_handler_1.deleteOneDeviceHandler);
