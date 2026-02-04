import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderStatusButton from "./orderStatusButton";
import { OrderDetailsType } from "@/types";
import { getUser } from "@/actions/user.action";
import { roles } from "@/constants/role";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteOrderButton from "./deleteOrderButton";

interface Props {
  data: OrderDetailsType[];
}

const OrderTable = async ({ data }: Props) => {
  const { data: userData, error: userError } = await getUser();

  return (
    <div className="border rounded-md mb-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Delete</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((order) => (
            <TableRow key={order?.id}>
              <TableCell className="font-mono text-xs">{order?.id}</TableCell>
              <TableCell>{order?.customerId}</TableCell>
              <TableCell>৳ {order?.totalAmount}</TableCell>
              <TableCell>{order?.paymentMethod}</TableCell>
              <TableCell>{order?.deliveryAddress}</TableCell>
              <TableCell>
                {userData?.data?.role === roles?.admin ? (
                  order?.status
                ) : (
                  <OrderStatusButton
                    orderId={order?.id}
                    currentStatus={order?.status as any}
                  />
                )}
              </TableCell>
              <TableCell>
                {new Date(order?.createdAt).toLocaleString()}
              </TableCell>
              <TableCell><DeleteOrderButton id={order?.id}/></TableCell>
              <TableCell>
                <Button className="text-white cursor-pointer">
                  {userData?.data?.role === roles.customer && (<Link href={`/customer/order-management/view?id=${order?.id}`}>View</Link>)}
                  {userData?.data?.role === roles.provider && (<Link href={`/provider/order-management/view?id=${order?.id}`}>View</Link>)}
                  {userData?.data?.role === roles.admin && (<Link href={`/admin/order-management/view?id=${order?.id}`}>View</Link>)}

                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
