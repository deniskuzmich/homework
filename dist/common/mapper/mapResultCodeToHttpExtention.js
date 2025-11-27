"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapResultCodeToHttpExtension = void 0;
const result_status_1 = require("../types/result.status");
const http_statuses_1 = require("../types/http-statuses");
const mapResultCodeToHttpExtension = (resultCode) => {
    switch (resultCode) {
        case result_status_1.ResultStatus.Success:
            return http_statuses_1.HttpStatuses.Success;
        case result_status_1.ResultStatus.BadRequest:
            return http_statuses_1.HttpStatuses.BadRequest;
        case result_status_1.ResultStatus.NotFound:
            return http_statuses_1.HttpStatuses.NotFound;
        case result_status_1.ResultStatus.Created:
            return http_statuses_1.HttpStatuses.Created;
        case result_status_1.ResultStatus.NoContent:
            return http_statuses_1.HttpStatuses.NoContent;
        case result_status_1.ResultStatus.Unauthorized:
            return http_statuses_1.HttpStatuses.Unauthorized;
        case result_status_1.ResultStatus.Forbidden:
            return http_statuses_1.HttpStatuses.Forbidden;
        default:
            return http_statuses_1.HttpStatuses.ServerError;
    }
};
exports.mapResultCodeToHttpExtension = mapResultCodeToHttpExtension;
