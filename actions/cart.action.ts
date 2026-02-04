"use server";
import { cartService } from "@/services/cart.service";
import { addCartType, editCartType } from "@/types/cart.type";
import { updateTag } from "next/cache";

export const addCart = async (postData: addCartType) => {
  try {
    const { data, error } = await cartService.addCart(postData);
    updateTag("cart");
    return { data: data, error: error };
  } catch (error) {
    return { data: null, error };
  }
};
export const getCart = async () => {
  try {
    const { data, error } = await cartService.getCart();
    return { data: data, error: error };
  } catch (error) {
    return { data: null, error };
  }
};

export const editCart=async(postData:editCartType)=>{
    try{
     const {data,error}=await cartService.editCart(postData);
     updateTag('cart');
     return {data:data,error:error}
    }
    catch(error){
        return {data:null,error}
    }
}


export const deleteCart=async({id}:{id:string})=>{
  try{
  const {data,error}=await cartService.deleteCart({id:id});
  updateTag('cart');
  return {data,error}
  }
  catch(error){
      return {data:null,error}
  }
}