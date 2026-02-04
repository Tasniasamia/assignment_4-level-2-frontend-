'use client';

import { addOrder } from '@/actions/order.action';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { userType } from '@/types';
import { CartItemType } from '@/types/cart.type';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import z from 'zod';

interface OrderSummaryProps {
  subtotal: number;
  userData:userType;
  cartData:CartItemType[];
 
}

export default function OrderSummary({
  subtotal,userData,cartData

}: OrderSummaryProps) {
  
  const total = subtotal;
  const formSchema = z.object({
    deliveryAddress: z.string(),
  });

  const form = useForm({
    defaultValues: {
      deliveryAddress:'',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toatId = toast.loading(
        "Placeing Order"
      );
      try {
        const cartArray = cartData?.map((i) => {
          return { id: i.id };
        });
        
        const { deliveryAddress } = value;
        const payload={
          userId:userData?.id,
          deliveryAddress:deliveryAddress,
          items: {
            connect: cartArray
          }

        }
  
          const { data, error } =
            await addOrder(payload);
          if (data?.success) {
            toast.success(
              data?.message || "Order has been placed",{ id: toatId }
            );
            return;
          }
         
         toast.error(
            error?.error?.message ||
              error?.message ||
              "Order placed failed",{ id: toatId }
          );
          return;
        
      } catch (err: any) {
        toast.error(err?.message, { id: toatId });
      }
    },
  });

  return (
    <Card className="p-6 sticky top-6 h-fit border-border bg-card">
      <h2 className="text-lg font-bold text-foreground mb-6">Order Summary</h2>
      <form
        id="order-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="deliveryAddress"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Delivery Address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Enter Delivery Address"
                    autoComplete="off"
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* <Button type="submit" form="category-form2" className="cursor-pointer">
            Save
          </Button> */}
        </FieldGroup>
      </form>






      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground font-medium">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Tax (10%)</span>
          <span className="text-foreground font-medium">
            $0
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span className="text-foreground font-medium">
            $0
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Payment</span>
          <span className="text-foreground font-medium">
            Cash On Delivery
          </span>
        </div>
        {/* Divider */}
        <div className="border-t border-border my-4" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-foreground">Total</span>
          <span className="text-xl font-bold text-accent">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <Button type="submit" form="order-form"
    
        className="w-full bg-accent text-white hover:bg-accent/90 cursor-pointer font-semibold h-12"
      >
        Place Order
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Your order will be delivered in 30-45 minutes
      </p>
    </Card>
  );
}
