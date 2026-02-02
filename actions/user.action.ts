'use server'
import { userService } from "@/services/user.service";
import { authUser} from "@/types";
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

// export const postLogin=async(postLoginData:authUser)=>{
//    try{
//       const {data,error} = await userService.login(postLoginData);
//       updateTag('user');
//       return { data: data, error:error };
//    }
//    catch(error){
//       return {data:null,error}
//    }
// }