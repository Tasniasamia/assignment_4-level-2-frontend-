"use client"
import { deleteCategory } from '@/actions/category.action';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const DeleteCategoryButton = ({id}:{id:string}) => {
    const {push}=useRouter();
    const handleDeleteCategory=async()=>{
        const {data,error}=await deleteCategory({id:id});
        if (data?.success) {
            toast.success(
              data?.message || "Category deleted successfully"
            );
            return;
          }
         
         toast.error(
            error?.error?.message ||
            error?.message ||
              "Category delete failed"
          );
          return;
    }
    return (
        <Button onClick={handleDeleteCategory} variant="destructive" className="cursor-pointer">
        Delete
      </Button>
    );
};

export default DeleteCategoryButton;