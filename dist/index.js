"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const settings_1 = require("./core/settings/settings");
const mongo_db_1 = require("./db/mongo.db");
const init_app_1 = require("./init-app");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = settings_1.SETTINGS.PORT;
    yield (0, mongo_db_1.runDB)(settings_1.SETTINGS.MONGO_URL);
    init_app_1.app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
    return init_app_1.app;
});
bootstrap();
