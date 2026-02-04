import { addCartType, editCartType } from "@/types/cart.type";
import { cookies } from "next/headers";

export const cartService={
    addCart:async(postData:addCartType)=>{
        try{
            const cookieStore = await cookies();
        
            const addCartData = await fetch(`${process.env.BACKEND_URL}/api/cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
               },
               
               body: JSON.stringify(postData),
            });
            const res=await addCartData.json();
            if(res?.success){
              return {data:res,error:null}
            }
            return {data:null,error:res?.error || res}
           }
          catch(error){
            return {data:null,error}
          }
    },
    getCart: async function () {
        try {
          const cookieStore = await cookies(); 
      
      
          const res = await fetch(
            `${process.env.BACKEND_URL}/api/cart`,
            {
              headers:{Cookie:cookieStore.toString()},
              next:{tags:['cart']}
            }
          );
      
          const data = await res.json();
          return { data, error: null };
      
        } catch (error) {
          return { data: null, error };
        }
      },
      editCart:async(postData:editCartType)=>{
        try{
            const cookieStore = await cookies();
        
            const editCartData = await fetch(`${process.env.BACKEND_URL}/api/cart/${postData?.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
               },
               
               body: JSON.stringify(postData),
            });
            const res=await editCartData.json();
            console.log('res',res);
            if(res?.success){
              return {data:res,error:null}
            }
            return {data:null,error:res?.error || res}
           }
          catch(error){
            return {data:null,error}
          }
    },
    deleteCart:async(id:{id:string})=>{
        
      try{
          const cookieStore = await cookies();
      
          const deleteCartData = await fetch(`${process.env.BACKEND_URL}/api/cart/${id?.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Cookie: cookieStore.toString(),
             }
             
          });
          const res=await deleteCartData.json();
          console.log('res',res);
          if(res?.success){
            return {data:res,error:null}
          }
          return {data:null,error:res?.error || res}
         }
        catch(error){
          return {data:null,error}
        }
  },

}