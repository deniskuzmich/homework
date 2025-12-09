"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultStatus = void 0;
var ResultStatus;
(function (ResultStatus) {
    ResultStatus["Success"] = "Success";
    ResultStatus["Created"] = "Created";
    ResultStatus["NoContent"] = "NoContent";
    ResultStatus["Forbidden"] = "Forbidden";
    ResultStatus["BadRequest"] = "BadRequest";
    ResultStatus["NotFound"] = "NotFound";
    ResultStatus["Unauthorized"] = "Unauthorized";
})(ResultStatus || (exports.ResultStatus = ResultStatus = {}));
;
//    OK_200: 200,
//   CREATED_201: 201,
//   NO_CONTENT_204: 204,
//
//   BAD_REQUEST_400: 400,
//   NOT_FOUND_404: 404,
//   UNAUTHORIZED_401: 401,
//   INTERNAL_SERVER_ERROR_500: 500,
