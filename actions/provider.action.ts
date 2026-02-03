'use server';
import { providerService } from "@/services/provider.service"
import { providerType } from "@/types";
import { updateTag } from "next/cache";

export const getProvider=async({id}:{id:string})=>{
    try{
    const {data,error}=await providerService.getProvider({id:id});
    return {data,error}
    }
    catch(error){
        return {data:null,error}
    }
}

export const updateProvider=async(providerData:providerType)=>{
    const {data,error}=await providerService.updateProvider(providerData);
    updateTag('provider');
    return {data:data,error:error}
 }
 