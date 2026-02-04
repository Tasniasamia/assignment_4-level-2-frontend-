import { getOrderById } from "@/actions/order.action";
import SingleOrderDetails from "@/components/modules/dashboard/common/orderDetailsData";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const { id } = await searchParams;
  const { data, error } = await getOrderById({ id: id });
  console.log("order details data", data);
  return (
    <main>
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className=" lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Order Details
            </h1>
          </div>
        </div>
      </header>
      <SingleOrderDetails order={data?.data}/>
    </main>
  );
};

export default page;
