import OrderTable from "@/components/modules/dashboard/common/orderTable";
import { PaginationCustom } from "@/components/modules/dashboard/common/pagination";
import { orderService } from "@/services/order.service";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string }>;
}) => {
  const { page, limit } = await searchParams;
  const pageInt = Number(page);
  const limitInt = Number(limit);
  const { data, error } = await orderService.getOrder({
    page: pageInt,
    limit: limitInt,
  });
  return (     <main className="min-h-screen bg-background">
   
  <h1 className="mb-8 text-4xl font-bold">Order Management Table</h1>
      <OrderTable data={data?.data}/>
      <PaginationCustom meta={data?.pagination}/>
  </main>);
};

export default page;
