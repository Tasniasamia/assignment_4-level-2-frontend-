import { getAllMeal } from "@/actions/meal.action";
import { getUser } from "@/actions/user.action";
import { MealCard } from "@/components/common/card/mealcard";
import About from "@/components/common/shared/about";
import Contact from "@/components/common/shared/contact";
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
      <div className="bg-background container lg:mb-40 mb-20 ">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Popular Meals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data?.slice(0, 8)?.map((meal: mealTableType) => (
            <MealCard key={meal.id} mealData={meal} userData={userData?.data} />
          ))}
        </div>
        
      </div>
      <About/>
      <Contact/>
      
    </div>
  );
};

export default page;
