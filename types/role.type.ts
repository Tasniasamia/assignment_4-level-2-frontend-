import { roles } from "@/constants/role";

export type Role = (typeof roles)[keyof typeof roles];
