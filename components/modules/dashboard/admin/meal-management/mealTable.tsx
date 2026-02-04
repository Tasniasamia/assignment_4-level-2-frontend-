"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
// import { filterProducts, type Product } from "@/lib/filter-products";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mealTableType } from "@/types";

interface ProductsTableProps {
  products: mealTableType[];
}

export function AdminMealTable({ products }: ProductsTableProps) {
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
          <TableHead className="p-2">Image</TableHead>

            <TableHead >Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Dietary Preference</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>view</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product:any) => (
            <TableRow key={product.id}>
                  <TableCell className='p-2'>
                                   <Image src={product?.image || '/default.jpg'} className='h-10 w-10 rounded-full' width={50} height={50} alt="profile"/>   
                                        </TableCell>
              <TableCell className="p-2 font-semibold">{product.name}</TableCell>
          
              <TableCell>
                <Badge variant="outline">{product?.category?.name}</Badge>
              </TableCell>
              <TableCell className="font-semibold">${product?.price}</TableCell>
              <TableCell>
                <Badge variant="secondary">{product?.dietaryPreferences}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {product.rating > 0 ? (
                    <>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {product.rating}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">No rating</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {product.isAvailable ? (
                  <Badge variant="default" className="bg-green-600">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </TableCell>
              <TableCell>
                  <Link
                    href={`/provider/meal-management`}
                  >
                    <Button variant="destructive" className="cursor-pointer">
                      view
                    </Button>
                  </Link>
              </TableCell>
  
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
