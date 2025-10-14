"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const setup_app_1 = require("./setup-app");
exports.app = (0, express_1.default)();
(0, setup_app_1.setupApp)(exports.app);
if (process.env.VERCEL !== "1") {
    const PORT = process.env.PORT || 5000;
    exports.app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
exports.default = exports.app;
