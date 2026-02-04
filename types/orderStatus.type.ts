import { orderStatus } from "@/constants/orderStatus";
import { roles } from "@/constants/role";

export type orderStatus = (typeof orderStatus)[keyof typeof orderStatus];
