"use client"
import { deleteMeal } from '@/actions/meal.action';
import { deleteOrder } from '@/actions/order.action';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const DeleteOrderButton = ({id}:{id:string}) => {
    const {push}=useRouter();
    const handleDelete=async()=>{
        const {data,error}=await deleteOrder({id:id});
        if (data?.success) {
            toast.success(
              data?.message || "Order deleted successfully"
            );
            return;
          }
         
         toast.error(
            error?.error?.message ||
            error?.message ||
              "Order delete failed"
          );
          return;
    }
    return (
        <Button onClick={handleDelete} variant="destructive" className="cursor-pointer">
        Delete
      </Button>
    );
};

export default DeleteOrderButton;