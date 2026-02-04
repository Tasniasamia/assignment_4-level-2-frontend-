import { getCart } from "@/actions/cart.action";
import { getUser } from "@/actions/user.action";
import CartItem from "@/components/modules/dashboard/customer/cart-management/cartItem";
import CustomerInfo from "@/components/modules/dashboard/customer/cart-management/customerInfo";
import { Card } from "@/components/ui/card";
import {CartItemType } from "@/types/cart.type";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { AnyARecord } from "node:dns";
import React from "react";

const page = async () => {
  const { data, error } = await getCart();
  const {data:userData,error:userError}=await getUser();
  console.log("cart data", data?.data);
  console.log("userData",userData)
  
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className=" lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-accent" />
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Checkout
            </h1>
          </div>
          <Link
            href="/meal"
            className="cursor-pointer flex gap-2 items-center text-muted-foreground"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="h-4 w-4 mr-2" />
          </Link>
        </div>
      </header>
      {/* <CheckoutPage /> */}
      <main className=" py-8">
        {data?.data?.length<0 ? (
          <Card className="p-12 text-center border-border bg-card">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Add some delicious meals to get started!
            </p>
            <Link
            href="/meal" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Continue Shopping
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              {/* Customer Info */}
              <CustomerInfo customer={userData?.data} />

              {/* Cart Items */}
              <Card className="border-border bg-card">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-bold text-foreground">
                    Cart Items ({data?.data?.length || 0})
                  </h2>
                </div>

                <div className="p-6 divide-y divide-border">
                  {data?.data?.map((item:CartItemType) => (
                    <CartItem
                      key={item?.id}
                      item={item}
                  
                    />
                  ))}
                </div>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            {/* <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                onCheckout={handleCheckout}
                isLoading={isCheckingOut}
              />
            </div> */}
          </div>
        )}
      </main>
    </main>
  );
};

export default page;
