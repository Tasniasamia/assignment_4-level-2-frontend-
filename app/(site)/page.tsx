import { getAllMeal } from "@/actions/meal.action";
import { getUser } from "@/actions/user.action";
import { MealCard } from "@/components/common/card/mealcard";
import FeatureSection from "@/components/modules/home/featureSection";
import Hero from "@/components/modules/home/hero";
import { mealTableType } from "@/types";
import React from "react";

const page = async () => {
  const { data } = await getAllMeal();
  const { data: userData, error: userError } = await getUser();

  return (
    <div>
      <Hero />
      <main className="min-h-screen bg-background container lg:mt-30 mt-10">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Popular Meals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data?.slice(0, 8)?.map((meal: mealTableType) => (
            <MealCard key={meal.id} mealData={meal} userData={userData?.data} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default page;
