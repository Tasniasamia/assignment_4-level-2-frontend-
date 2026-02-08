import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});



// export const signIn = async () => {
//     try{
//         const data = await authClient.signIn.social({
//             provider: "google",
//           });
//     }
//     catch(err){
//     }
 
// };