import { Role } from "./role.type";
import { userStatus } from "./userStatus.type";

export interface authUser{
    name?:string,
    email:string,
    role:Role,
    password:string,
}

export interface userType{
    id: string,
    name: string,
    email: string,
    emailVerified: boolean,
    image: string | null,
    role: Role,
    status: userStatus,
    createdAt: string,
    updatedAt: string,
}