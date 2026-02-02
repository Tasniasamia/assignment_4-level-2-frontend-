import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:5000", 
  credentials: "include", // 🔥 MUST
});




export const signIn = async () => {
    try{
        const data = await authClient.signIn.social({
            provider: "google",
          });
    }
    catch(err){
        // console.log(err)
    }
 
};