import { getOrder } from "@/actions/order.action";
import { getProviderDashboard } from "@/actions/provider.action";
import DashboardCard from "@/components/common/card/dashboardCard";
import OrderTable from "@/components/modules/dashboard/common/orderTable";
import React from "react";

const page = async () => {
  const { data, error } = await getProviderDashboard();
  const { data:orderData, error:orderError } = await getOrder({page:1,limit:8});
  return (
    <main className="min-h-screen bg-background">
      <h1 className="mb-8 text-4xl font-bold">Provider Dashboard</h1>
<div className="grid lg:grid-cols-4 gap-4 sm:grid-cols-2 grid-cols-1 mb-8">
      <DashboardCard
        title={"Orders"}
        value={data?.data?.totalOrderCount}
        subtitle="Your total order"
      />

      <DashboardCard
        title={"Total Amount"}
        value={`$${data?.data?.totalOrderAmount}`}
        subtitle="Your total amount"
      />

      <DashboardCard
        title={"Delievered"}
        value={data?.data?.deliveredOrderCount}
        subtitle="Delivered order"
      />
      <DashboardCard
        title={"Paid"}
        value={`$${data?.data?.deliveredOrderAmount}`}
        subtitle="Paid amount"
      />
      </div>
      <OrderTable data={orderData?.data}/>

    </main>
  );
};

export default page;
