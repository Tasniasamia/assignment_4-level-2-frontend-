import { getAllCategory } from "@/actions/category.action";
import { getUser } from "@/actions/user.action";
import { MenuItemForm } from "@/components/modules/dashboard/provider/meal-management/mealForm";
import React from "react";

const page = async () => {
  const { data, error } = await getAllCategory();
  const { data: userdata, error: userError } = await getUser();
  return (
    <main className="min-h-screen bg-background">
      <h1 className="mb-8 text-4xl font-bold">Create Menu Item</h1>
      <MenuItemForm categories={data?.data} providerId={userdata?.data?.id} />
    </main>
  );
};

export default page;
