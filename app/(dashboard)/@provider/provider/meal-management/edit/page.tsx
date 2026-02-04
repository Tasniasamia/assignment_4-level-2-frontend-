import { getAllCategory } from '@/actions/category.action';
import { getUser } from '@/actions/user.action';
import { EditmenuItemForm } from '@/components/modules/dashboard/provider/meal-management/editMealForm';
import { mealService } from '@/services/meal.service';
import React from 'react';

const page = async ({
    searchParams,
  }: {
    searchParams: Promise<{ id: string}>;
  }) => {
    const { id} = await searchParams;
    const { data, error } = await getAllCategory();
  const { data: userdata, error: userError } = await getUser();
  const {data:mealData,error:mealError}=await mealService.getMealById({id:id});

  return (
    <main className="min-h-screen bg-background">
      <h1 className="mb-8 text-4xl font-bold">Create Menu Item</h1>
      <EditmenuItemForm categories={data?.data} providerId={userdata?.data?.id} mealData={mealData?.data}/>
    </main>
  );
};

export default page;