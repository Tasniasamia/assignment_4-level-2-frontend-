import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BACKEND_URL, 
  credentials: "include", // 🔥 MUST
});




export const signIn = async () => {
    try{
        const data = await authClient.signIn.social({
            provider: "google",
          });
    }
    catch(err){
    }
 
};