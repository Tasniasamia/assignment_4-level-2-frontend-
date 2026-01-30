'use client'

import Image from 'next/image'
// import { useCart } from '@/context/cart-context'
import { ShoppingCart, Star } from 'lucide-react'

interface MealCardProps {
  id: string
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  restaurant: string
  description: string
}

export function MealCard({
  id,
  name,
  price,
  image,
  rating,
  reviews,
  restaurant,
  description,
}: MealCardProps) {
//   const { addToCart } = useCart()

  const handleAddToCart = () => {
    // addToCart({
    //   id,
    //   name,
    //   price,
    //   image,
    //   restaurant,
    // })
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="relative w-full h-40 bg-muted overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
          <Star size={14} fill="currentColor" />
          {rating}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2">
          {name}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">{restaurant}</p>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">{reviews} reviews</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-lg transition-colors duration-200"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
