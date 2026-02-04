'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface OrderSummaryProps {
  subtotal: number;
  taxRate?: number;
  deliveryFee?: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

export default function OrderSummary({
  subtotal,
  taxRate = 0.1,
  deliveryFee = 2.99,
  onCheckout,
  isLoading = false,
}: OrderSummaryProps) {
  const tax = subtotal * taxRate;
  const total = subtotal + tax + deliveryFee;

  return (
    <Card className="p-6 sticky top-6 h-fit border-border bg-card">
      <h2 className="text-lg font-bold text-foreground mb-6">Order Summary</h2>

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
            ${tax.toFixed(2)}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span className="text-foreground font-medium">
            ${deliveryFee.toFixed(2)}
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

      <Button
        onClick={onCheckout}
        disabled={isLoading || subtotal === 0}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12"
      >
        {isLoading ? 'Processing...' : 'Proceed to Checkout'}
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Your order will be delivered in 30-45 minutes
      </p>
    </Card>
  );
}
