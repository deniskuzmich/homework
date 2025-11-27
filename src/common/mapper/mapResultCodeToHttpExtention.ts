import {ResultStatus} from "../types/result.status";
import {HttpStatuses} from "../types/http-statuses";

export const mapResultCodeToHttpExtension = (resultCode: ResultStatus): number => {
  switch (resultCode) {
    case ResultStatus.Success:
      return HttpStatuses.Success
    case ResultStatus.BadRequest:
      return HttpStatuses.BadRequest
    case ResultStatus.NotFound:
      return HttpStatuses.NotFound
    case ResultStatus.Created:
      return HttpStatuses.Created
    case ResultStatus.NoContent:
      return HttpStatuses.NoContent
    case ResultStatus.Unauthorized:
      return HttpStatuses.Unauthorized
    case ResultStatus.Forbidden:
      return HttpStatuses.Forbidden
    default:
      return HttpStatuses.ServerError
  }
}