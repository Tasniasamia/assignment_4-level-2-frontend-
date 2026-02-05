import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { OrderDetailsType } from "@/types";
import { Button } from "@/components/ui/button";
import { orderStatus } from "@/constants/orderStatus";
import Link from "next/link";
import { getUser } from "@/actions/user.action";
import { roles } from "@/constants/role";

interface Props {
  order: OrderDetailsType;
}

export default async function  SingleOrderDetails({ order }: Props) {
  console.log("order", order);
  const {data,error}=await getUser();
  return (
    <div className="space-y-6 pt-6">
      {/* ================= Order Summary ================= */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Order Details</span>
            <div className="flex gap-3 items-center">
              <Badge
                variant="outline"
                className=" p-2 text-lg  text-gray-600 border font-bold"
              >
                {order?.status}
              </Badge>
         
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Order ID</p>
            <p className="font-mono text-xs">{order.id}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Customer </p>
            <div>
              <p className="text-sm font-medium">{order?.userdata?.name}</p>
              <p className="text-xs text-muted-foreground">
                {order?.userdata?.email}
              </p>
            </div>{" "}
          </div>

          <div>
            <p className="text-muted-foreground">Payment</p>
            <p>{order.paymentMethod}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Delivery Address</p>
            <p>{order.deliveryAddress}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Total Amount</p>
            <p className="font-semibold">৳ {order.totalAmount}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Created At</p>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>

        </CardContent>
      </Card>

      {/* ================= Order Items ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Ordered Items</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-3">Meal</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Restaurant</TableHead>
                {data?.data?.role === roles.customer && (
                <TableHead>Add Review</TableHead>)}
                </TableRow>
            </TableHeader>

            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item?.id}>
                  {/* Meal */}
                  <TableCell className="flex items-center gap-3 p-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={item?.meal?.image || "/no-food.png"}
                        alt={item?.meal?.name}
                        width={48}
                        height={48}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item?.meal?.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {item?.meal?.description}
                      </p>
                    </div>
                  </TableCell>

                  {/* Price */}
                  <TableCell>৳ {item?.meal?.price}</TableCell>

                  {/* Quantity */}
                  <TableCell>{item?.quantity}</TableCell>

                  {/* Item Total */}
                  <TableCell className="font-semibold">
                    ৳ {item?.meal?.price * item?.quantity}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">
                        {item?.meal?.provider?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item?.meal?.provider?.email}
                      </p>
                    </div>
                  </TableCell>
                  {/* Provider */}
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">
                        {item?.meal?.provider?.ProviderProfiles?.restaurantName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item?.meal?.provider?.ProviderProfiles?.address}
                      </p>
                    </div>
                  </TableCell>
                  {data?.data?.role === roles.customer && (
                 <TableCell><Link className="text-primary underline" href={`/customer/review?orderId=${order?.id}&mealId=${item?.meal?.id}&userId=${data?.data?.id}`}>Add Review</Link></TableCell>)}
                 

                </TableRow>
              ))}

              {order.items.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-6"
                  >
                    No items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
