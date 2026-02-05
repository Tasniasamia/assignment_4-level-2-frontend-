import { getAllCategory } from "@/actions/category.action";
import { getAllMeal, getMealByProvider } from "@/actions/meal.action";
import { getUser } from "@/actions/user.action";
import { MealCard } from "@/components/common/card/mealcard";
import { SearchBar } from "@/components/common/search/searchbar";
import Banner from "@/components/layout/banner";
import { PaginationCustom } from "@/components/modules/dashboard/common/pagination";
import { MealTable } from "@/components/modules/dashboard/provider/meal-management/mealTable";
import { Button } from "@/components/ui/button";
import { mealTableType } from "@/types";
import Link from "next/link";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    limit: string;
    category?: string;
    dietaryPreference?: string;
    priceNumber?: string;
  }>;
}) => {
  const { page, limit, priceNumber, category, dietaryPreference } =
    await searchParams;
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

  const { data: categoryData, error: categoryError } = await getAllCategory();
  const {data:userData,error:userError}=await getUser();
  return (
    <div>
      <Banner routeName="Meal" />

      <main className="min-h-screen bg-background container lg:mt-30 mt-10">
        <h1 className="mb-8 text-4xl font-bold">Meal Management</h1>
         <SearchBar categories={categoryData?.data} />
         <section className="py-12 pb-20">
        <h2 className="text-3xl font-bold text-foreground mb-8">Popular Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data?.map((meal:mealTableType) => (
            <MealCard key={meal.id} mealData={meal} userData={userData?.data}/>
          ))}
        </div>
      </section>
        <PaginationCustom meta={data?.pagination} />
      </main>
    </div>
  );
};

export default page;
