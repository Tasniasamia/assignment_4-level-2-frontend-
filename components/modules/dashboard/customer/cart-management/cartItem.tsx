'use client';

import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CartItemType } from '@/types/cart.type';

export interface CartItemData {
  id: string;
  meal: {
    id: string;
    name: string;
    price: number;
    image: string | null;
    description: string;
  };
  quantity: number;
  mealId: string;
}

interface CartItemProps {
  item: CartItemType;

}

export default function CartItem({
  item,
}: CartItemProps) {
//   const handleIncrease = () => {
//     onUpdateQuantity(item.id, item.quantity + 1);
//   };

//   const handleDecrease = () => {
//     if (item.quantity > 1) {
//       onUpdateQuantity(item.id, item.quantity - 1);
//     }
//   };

  const handleUpdateQuantity = () => {

    
  };

  const handleRemoveItem = () => {

  };

  return (
    <div className="flex gap-4 py-6 border-b border-border last:border-b-0">
      {/* Meal Image */}
      <div className="w-24 h-24 bg-muted rounded-lg shrink-0 overflow-hidden">
        {item.meal.image ? (
          <Image
            src={item?.meal?.image || "/no-food.png"}
            alt={item?.meal?.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
            <span className="text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Meal Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base text-foreground mb-1">
          {item?.meal?.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {item?.meal?.description}
        </p>
        <p className="font-semibold text-accent">${item?.meal?.price?.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center border border-border rounded-lg bg-card">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUpdateQuantity}
            className="h-8 w-8 p-0"
            disabled={item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">
            {item?.quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUpdateQuantity}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* <div className="text-right">
          <p className="text-sm text-muted-foreground mb-2">Subtotal</p>
          <p className="font-bold text-foreground">
            ${itemTotal.toFixed(2)}
          </p>
        </div> */}

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemoveItem}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-2"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
}
