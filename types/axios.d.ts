import { AxiosError } from "axios";

declare interface IErrorResponse {
  code?: string;
  message: string;
  errors?: Record<string, string[]>;
}

declare type CustomAxiosError = AxiosError<IErrorResponse>;
