import { getAllCategory } from "@/actions/category.action";
import { getAllMeal, getMealByProvider } from "@/actions/meal.action";
import { SearchBar } from "@/components/common/search/searchbar";
import { AdminMealTable } from "@/components/modules/dashboard/admin/meal-management/mealTable";
import { PaginationCustom } from "@/components/modules/dashboard/common/pagination";
import { MealTable } from "@/components/modules/dashboard/provider/meal-management/mealTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string,category?:string ,dietaryPreference?:string,priceNumber?:string }>;
}) => {
  const { page, limit ,priceNumber,category,dietaryPreference} = await searchParams;
  const pageInt = Number(page ?? 1);
  const limitInt = Number(limit ?? 10);
  const price = priceNumber ? Number(priceNumber) : 0;
  const { data } = await getAllMeal({
    page: pageInt,
    limit: limitInt,
    price: price,
    categoryId: category || "",
    dietaryPreferences: dietaryPreference || "",
  });

  const {data:categoryData,error:categoryError}=await getAllCategory();
  return (
    <div>
      <main className="min-h-screen bg-background">
        <h1 className="mb-8 text-4xl font-bold">Meal Management</h1>
        <SearchBar categories={categoryData?.data}/>
        <AdminMealTable products={data?.data}/>
        <PaginationCustom meta={data?.pagination}/>

      </main>
    </div>
  );
};

export default page;
