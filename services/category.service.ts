import { cookies } from "next/headers";

export const categoryService={
    addCategory:async(postData:{name:string})=>{
        try{
            const cookieStore = await cookies();
        
            const addCategoryData = await fetch(`${process.env.BACKEND_URL}/api/meals/category`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
               },
               
               body: JSON.stringify(postData),
            });
            const res=await addCategoryData.json();
            if(res?.success){
              return {data:res,error:null}
            }
            return {data:null,error:res?.error || res}
           }
          catch(error){
            return {data:null,error}
          }
    },
    getAllCategory: async function () {
        try {
          const cookieStore = await cookies(); 
          const res = await fetch(
            `${process.env.BACKEND_URL}/api/meals/category`,
            {
              headers:{Cookie:cookieStore.toString()},
              next:{tags:['category']}
            }
          );
      
          const data = await res.json();
          return { data, error: null };
      
        } catch (error) {
          return { data: null, error };
        }
      },
    editCategory:async(postData:{id:string,name:string})=>{
        try{
            const cookieStore = await cookies();
        
            const editCategoryData = await fetch(`${process.env.BACKEND_URL}/api/meals/category/${postData?.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
               },
               
               body: JSON.stringify(postData),
            });
            const res=await editCategoryData.json();
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
    deleteCategory:async(id:{id:string})=>{
        
        try{
            const cookieStore = await cookies();
        
            const editCategoryData = await fetch(`${process.env.BACKEND_URL}/api/meals/category/${id?.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
               }
               
            });
            const res=await editCategoryData.json();
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