"use client"
import { deleteMeal } from '@/actions/meal.action';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const DeleteMealButton = ({id}:{id:string}) => {
    const {push}=useRouter();
    const handleDelete=async()=>{
        const {data,error}=await deleteMeal({id:id});
        if (data?.success) {
            toast.success(
              data?.message || "Meal deleted successfully"
            );
            return;
          }
         
         toast.error(
            error?.error?.message ||
            error?.message ||
              "Meal delete failed"
          );
          return;
    }
    return (
        <Button onClick={handleDelete} variant="destructive" className="cursor-pointer">
        Delete
      </Button>
    );
};

export default DeleteMealButton;