import { userStatus } from "@/constants/userStatus";

export type userStatus=(typeof userStatus)[keyof typeof userStatus]