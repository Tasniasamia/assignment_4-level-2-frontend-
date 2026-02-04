"use client";

import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CartItemType } from "@/types/cart.type";
import { useState } from "react";
import { toast } from "sonner";
import { deleteCart, editCart } from "@/actions/cart.action";
import { useRouter } from "next/navigation";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {

  const [quantity, setQuantity] = useState<number>(item?.quantity);

  // ➕ Increase quantity
  const handleIncrease = async () => {
    const newQuantity = quantity + 1;


    const toatId = toast.loading("editing item tnto cart");

    try {
      const { data, error } = await editCart({
        id: item?.id,
        userId: item?.userId,
        mealId: item?.mealId,
        quantity: newQuantity,
      });
      if (data?.success) {
        toast.success(data.message || "Edit Item into Cart", { id: toatId });
        setQuantity(newQuantity);

        // push('/customer/checkout');
        return;
      }

      toast.error(
        error?.error?.message ||
          error?.message ||
          "Edit item into cart get failed",
        { id: toatId }
      );
      return;
    } catch (error: any) {
      toast.error(error?.message, { id: toatId });
    }
  };
  const handleDecrease = async () => {
    if (quantity <= 1) return;

    const newQuantity = quantity - 1;


    const toatId = toast.loading("editing item tnto cart");

    try {
      const { data, error } = await editCart({
        id: item?.id,
        userId: item?.userId,
        mealId: item?.mealId,
        quantity: newQuantity,
      });
      if (data?.success) {
        toast.success(data.message || "Edit Item into Cart", { id: toatId });
        setQuantity(newQuantity);
        return;
      }

      toast.error(
        error?.error?.message ||
          error?.message ||
          "Edit item into cart get failed",
        { id: toatId }
      );
      return;
    } catch (error: any) {
      toast.error(error?.message, { id: toatId });
    }
  };


  const handleRemoveItem = async() => {
    const {data,error}=await deleteCart({id:item?.id});
    if (data?.success) {
        toast.success(
          data?.message || "Cart deleted successfully"
        );
        return;
      }
     
     toast.error(
        error?.error?.message ||
        error?.message ||
          "Cart delete failed"
      );
      return;
  };

  return (
    <div className="flex gap-4 py-6 border-b border-border last:border-b-0">
      {/* Image */}
      <div className="w-24 h-24 bg-muted rounded-lg shrink-0 overflow-hidden">
        {item?.meal?.image ? (
          <Image
            src={item?.meal?.image || "/no-food.png"}
            alt={item?.meal?.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold">{item?.meal?.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.meal.description}
        </p>
        <p className="font-semibold text-accent">
          ${item.meal.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center border rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="w-8 text-center text-sm font-medium">
            {item?.quantity}
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleIncrease}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Remove */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemoveItem}
          className="text-destructive cursor-pointer hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
}
