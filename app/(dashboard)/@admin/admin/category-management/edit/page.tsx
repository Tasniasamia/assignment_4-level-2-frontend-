import { EditCategoryForm } from "@/components/modules/dashboard/admin/category-management/editCategoryform";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string; name: string }>;
}) => {
  const { id, name } = await searchParams;

  return (
    <main className="min-h-screen bg-background">
      <h1 className="mb-8 text-4xl font-bold">Edit Category </h1>     
       <EditCategoryForm id={id} name={name} />
    </main>
  );
};

export default page;
