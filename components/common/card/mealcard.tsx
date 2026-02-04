'use client'

import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import { mealTableType, userType } from '@/types'
import { roles } from '@/constants/role'
import { toast } from 'sonner'
import { addCart } from '@/actions/cart.action'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface mealType{
  mealData:mealTableType,
  userData?:userType
}

export function MealCard({mealData,userData}:mealType ) {
//   const { addToCart } = useCart()
const {push}=useRouter();

  const handleAddToCart =async () => {
    const toatId = toast.loading("adding item tnto cart");

  try{

     if(userData?.role !== roles.customer){
      toast.error('You have to be customer',{id:toatId});
      return;
     }
     const { data, error } = await addCart({
      userId: userData?.id,
      mealId: mealData?.id,
      quantity: 1,
    });
    if (data?.success) {
      toast.success(data.message || "Add Item into Cart",{ id: toatId });
      push('/customer/checkout');
      return;
    }

    toast.error(
      error?.error?.message || error?.message || "Add item into cart get failed",{ id: toatId }
    );
    return;
     
  }
  catch(error:any){
   toast.error(error?.message,{ id: toatId })
  }
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="relative w-full h-40 bg-muted overflow-hidden">
        <Image
          src={mealData?.image || "/no-food.png"}
          alt={mealData?.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
          <Star size={14} fill="currentColor" />
          {mealData?.rating}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2">
          {mealData?.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">{mealData?.provider?.ProviderProfiles?.restaurantName}</p>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {mealData?.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-lg font-bold text-primary">${mealData?.price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">{mealData?.rating} reviews</p>
          </div>
          <Button
            onClick={handleAddToCart}
            className="bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground p-2 rounded-lg transition-colors duration-200"
          >
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}
