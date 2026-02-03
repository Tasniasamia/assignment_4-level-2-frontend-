import { userStatus } from "./userStatus.type";

export interface QueryOptions {
    page: number,
    limit: number,
    skip: number,
    search: string | undefined,
    status: userStatus | undefined
  }