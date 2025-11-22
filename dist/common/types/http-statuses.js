"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatuses = void 0;
var HttpStatuses;
(function (HttpStatuses) {
    HttpStatuses[HttpStatuses["Success"] = 200] = "Success";
    HttpStatuses[HttpStatuses["Created"] = 201] = "Created";
    HttpStatuses[HttpStatuses["NoContent"] = 204] = "NoContent";
    HttpStatuses[HttpStatuses["BadRequest"] = 400] = "BadRequest";
    HttpStatuses[HttpStatuses["Unauthorized"] = 401] = "Unauthorized";
    HttpStatuses[HttpStatuses["NotFound"] = 404] = "NotFound";
    HttpStatuses[HttpStatuses["ServerError"] = 500] = "ServerError";
})(HttpStatuses || (exports.HttpStatuses = HttpStatuses = {}));
