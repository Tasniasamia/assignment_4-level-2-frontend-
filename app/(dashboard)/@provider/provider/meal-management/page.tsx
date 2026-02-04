import { getAllCategory } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string }>;
}) => {
  const { page, limit } = await searchParams;
  const pageInt = Number(page);
  const limitInt = Number(limit);
  const { data, error } = await getAllCategory();

  return (
    <div>
      <main className="min-h-screen bg-background">
        <h1 className="mb-8 text-4xl font-bold">Meal Management</h1>
        <Button variant="destructive" className="cursor-pointer">
          <Link href="/provider/meal-management/add">Add Meal</Link>
        </Button>
      </main>
    </div>
  );
};

export default page;
