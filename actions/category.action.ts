'use server';
import { categoryService } from "@/services/category.service"
import { updateTag } from "next/cache";

export const addCategory=async(postData:{name:string})=>{
    try{
     const {data,error}=await categoryService.addCategory(postData);
     updateTag('category');
     return {data:data,error:error}
    }
    catch(error){
        return {data:null,error}
    }
}

export const getAllCategory=async()=>{
    try{
     const {data,error}=await categoryService.getAllCategory();
     return {data:data,error:error}
    }
    catch(error){
        return {data:null,error}
    }
}

export const editCategory=async(postData:{id:string,name:string})=>{
    try{
     const {data,error}=await categoryService.editCategory(postData);
     updateTag('category');
     return {data:data,error:error}
    }
    catch(error){
        return {data:null,error}
    }
}

export const deleteCategory=async({id}:{id:string})=>{
    try{
    const {data,error}=await categoryService.deleteCategory({id:id});
    updateTag('category');
    return {data,error}
    }
    catch(error){
        return {data:null,error}
    }
}