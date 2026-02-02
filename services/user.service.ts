import { authUser} from "@/types";
import { cookies } from "next/headers";

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
      if (res?.success) {
        return { data: res, error: null };
      }
      return { data: null, error: res };
    } catch (error) {
      return { data: null, error: error };
    }
  },
login:async(postLoginData:authUser)=>{
try{
  const createLogin = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    credentials: "include",
    body: JSON.stringify(postLoginData),
  });
  const res = await createLogin.json();
  if (res?.success) {
    return { data: res, error: null };
  }
  return { data: null, error: res };
}
catch(error){
  return {data:null,error}
}
  },

  getSession: async function () {
    try {
      const cookieStore = await cookies(); // ❌ await নয়
  
  
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/auth/me`,
        {
          headers:{Cookie:cookieStore.toString()},
          cache:'no-store'
        }
      );
  
      const data = await res.json();
      return { data, error: null };
  
    } catch (error) {
      return { data: null, error };
    }
  }

}