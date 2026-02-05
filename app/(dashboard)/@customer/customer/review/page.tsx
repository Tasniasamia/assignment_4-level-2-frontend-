import ReviewSection from '@/components/modules/dashboard/customer/review-management/reviewComponent';
import React from 'react';

const page = async ({
    searchParams,
  }: {
    searchParams: Promise<{ userId: string; mealId: string ,orderId:string}>;
  }) => {
    const { userId, mealId,orderId } = await searchParams;
    return (
        <div>
            <ReviewSection userId={userId} mealId={mealId} orderId={orderId}/>
        </div>
    );
};

export default page;