import { authUser, TEditUser} from "@/types";
import { cookies, headers } from "next/headers";

export const userService={
  signup: async (
    postSignupData:authUser 
  ) => {
    try {
      const createSignup = await fetch(`${process.env.BACKEND_URL}/api/auth/resister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         },
         credentials: "include",
         body: JSON.stringify(postSignupData),
      });
      const res = await createSignup.json();
      if (res?.user) {
        return { data: res, error: null };
      }
      return { data: null, error: res };
    } catch (error) {
      return { data: null, error: error };
    }
  },

  getSession: async function () {
    try {
      const cookieStore = await cookies(); 
  
  
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/auth/me`,
        {
          headers:{Cookie:cookieStore.toString()},
          next:{tags:['user']}
        }
      );
  
      const data = await res.json();
      return { data, error: null };
  
    } catch (error) {
      return { data: null, error };
    }
  },
  
  logOut:async function(){
   const storeCookie=await cookies();
   storeCookie.delete('better-auth.session_token');
   return null
  },
  updateProfile:async function(userData:TEditUser){
   try{
    const cookieStore = await cookies();

    const profileUpdate = await fetch(`${process.env.BACKEND_URL}/api/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
       },
       
       body: JSON.stringify(userData),
    });
    const res=await profileUpdate.json();
    console.log("res into user service",res);
    if(res?.success){
      return {data:res,error:null}
    }
    return {data:null,error:res?.error || res}
   }
  catch(error){
    return {data:null,error}
  }
}
}