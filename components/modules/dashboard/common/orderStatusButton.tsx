"use client";

import { updateOrderStatus } from "@/actions/order.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderStatus } from "@/types";
import { toast } from "sonner";

interface Props {
  orderId: string;
  currentStatus: orderStatus;
}

export default function OrderStatusButton({ orderId, currentStatus }: Props) {
  const handleChange = async (value: orderStatus) => {
    const toatId = toast.loading(
      "Updating Order Status"
    );
    try{
      const {data,error}=await updateOrderStatus({
        id: orderId,
        status: value,
       })
       if (data?.success) {
        toast.success(
          data?.message || "Order status updated successfully",{ id: toatId }
        );
        return;
      }
     
     toast.error(
        error?.error?.message ||
          error?.message ||
          "Order status update failed",{ id: toatId }
      );
      return;
    

    }
    catch(error:any){
      toast.error(error?.message, { id: toatId });

    }
  
  };

  return (
    <Select defaultValue={currentStatus} onValueChange={handleChange}>
      <SelectTrigger className="w-40 capitalize">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {["PLACED", "PREPARING", "READY", "DELIVERED", "CANCELLED"]?.map(
          (status) => (
            <SelectItem key={status} value={status} className="capitalize">
              {status}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}
