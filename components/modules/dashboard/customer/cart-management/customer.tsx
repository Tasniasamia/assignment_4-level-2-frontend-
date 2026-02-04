'use client';

import { useState } from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import OrderSummary from '@/components/modules/dashboard/customer/cart-management/orderSummary';
// import CartItem, { CartItemData } from '@/components/modules/dashboard/customer/cart-management/cartItem';
import CustomerInfo from '@/components/modules/dashboard/customer/cart-management/customerInfo';
// import CartItem, { CartItemData } from '@/components/cart-item';
// import OrderSummary from '@/components/order-summary';
// import CustomerInfo from '@/components/customer-info';

// Sample data - in a real app this would come from your backend/state management
const initialCartData = [
  {
    id: 'cml80a96u0003w68w14t2d0xn',
    meal: {
      id: 'cml7qyn0t000hw6cgt8fw0293',
      name: 'fdfg',
      price: 18,
      image: null,
      description: 'fdgsdfgdfg',
      categoryId: 'cml70g18a0000w69wosjjwqz8',
      dietaryPreferences: 'dsfasdfdsf',
      isAvailable: true,
      rating: 0,
      createdAt: '2026-02-04T08:09:48.557Z',
      updatedAt: '2026-02-04T08:09:48.557Z',
      providerId: 'H784LedW7Y4o3MqjtjAm73tn146TX8kq',
    },
    mealId: 'cml7qyn0t000hw6cgt8fw0293',
    quantity: 1,
    userId: 'Z3bldXAiu4ADUjSrQnUhnVLe1iU6cOBN',
    orderId: null,
  },
];

const customerData = {
  name: 'customer',
  email: 'customer@gmail.com',
  image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
  role: 'customer',
  status: 'activate',
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any>(initialCartData);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
  //   setCartItems((items) =>
  //     items.map((item) =>
  //       item.id === itemId ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  // const handleRemoveItem = (itemId: string) => {
  //   setCartItems((items) => items.filter((item) => item.id !== itemId));
  // };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Order placed successfully!');
      setIsCheckingOut(false);
    } catch (error) {
      console.error('Checkout error:', error);
      setIsCheckingOut(false);
    }
  };



  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-accent" />
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Checkout
            </h1>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isEmpty ? (
          <Card className="p-12 text-center border-border bg-card">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Add some delicious meals to get started!
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Continue Shopping
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              {/* Customer Info */}
              <CustomerInfo customer={customerData} />

              {/* Cart Items */}
              <Card className="border-border bg-card">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-bold text-foreground">
                    Order Items ({cartItems.length})
                  </h2>
                </div>

                <div className="p-6 divide-y divide-border">
                  {/* {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))} */}
                </div>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            {/* <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
              />
            </div> */}
          </div>
        )}
      </main>
    </div>
  );
}
