"use client";

import { Card } from "@/components/ui/card";
import { User, Mail, MapPin } from "lucide-react";
import Image from "next/image";

interface CustomerData {
  name: string;
  email: string;
  image: string | null;
}

interface CustomerInfoProps {
  customer: CustomerData;
}

export default function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <Card className="p-6 border-border bg-card mb-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Curstomer Info</h2>

      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-muted">
          {customer?.image ? (
            <Image
              src={customer?.image || "/default.jpg"}
              alt={customer?.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Customer Details */}
        <div className="flex-1">
          <div className="mb-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Customer Name
            </p>
            <p className="font-semibold text-foreground">{customer?.name}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{customer?.email}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
