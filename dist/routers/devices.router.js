"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devicesRouter = void 0;
const express_1 = require("express");
const composition_root_1 = require("../core/composition/composition-root");
exports.devicesRouter = (0, express_1.Router)()
    .get('/devices', composition_root_1.getDevicesHandler.getDevices)
    .delete('/devices/', composition_root_1.deleteAllDevicesHandler.delete)
    .delete('/devices/:deviceId', composition_root_1.deleteOneDeviceHandler.deleteOne);
