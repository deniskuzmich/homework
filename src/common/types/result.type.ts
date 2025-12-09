import {ResultStatus} from "./result.status";

type ExtentionType = {
  field: string | null
  message: string
}

export type ResultType<T = null | boolean> = {
  status: ResultStatus;
  errorMessage?: string;
  extensions: ExtentionType[]
  data: T;
}