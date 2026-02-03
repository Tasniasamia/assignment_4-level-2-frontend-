'use server'
import { userStatus } from "@/constants/userStatus";
import { userService } from "@/services/user.service";
import { authUser, QueryOptions, TEditUser} from "@/types";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export const postSignUp= async(postSignupData:authUser) => {
try {
const {data,error} = await userService.signup(postSignupData);
updateTag('user');

return { data: data, error:error };

} 
catch (error) {
return { data: null, error };
}
};

export const verifyEmail=async(token:string)=>{
   
   return redirect(`${process.env.BACKEND_URL}/api/auth/verify-email?token=${token}`);
}


export const getUser=async()=>{
try{
    const {data,error}=await userService.getSession();
    return {data:data,error:error}
}
catch (error) {
   return { data: null, error };
   }
}

export const logOut=async()=>{
  const returnNull= await userService.logOut();
  return returnNull;
  
}

export const updateProfile=async(userData:TEditUser)=>{
   const {data,error}=await userService.updateProfile(userData);
   updateTag('user');
   return {data:data,error:error}
}


export const getUserByAdmin=async( query?: Partial<QueryOptions>)=>{
   try{
      const queries: QueryOptions = {
         search: query?.search ?? "",
         status: query?.status?? userStatus.activate,
         page: query?.page ?? 1,
         limit: query?.limit ?? 100,
         skip: query?.skip ?? 0,
   
       };
      const {data,error}=await userService.getUserByAdmin(queries);
      return {data:data,error:error}
  }
  catch (error) {
     return { data: null, error };
     }}


   export const updateStatus=async({id}:{id:string})=>{
      try{
         const {data,error}=await userService.updateStatus({id:id});
         updateTag('user');
         return {data:data,error:error}
      }
      catch(error){
         return {data:null,error}
      }
   }