import { getMealById } from '@/actions/meal.action';
import { getUser } from '@/actions/user.action';
import Banner from '@/components/layout/banner';
import ReviewSection from '@/components/modules/dashboard/customer/review-management/reviewComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import { roles } from '@/constants/role';
import Image from 'next/image';
import React from 'react';

const page = async ({
    searchParams,
  }: {
    searchParams: Promise<{ id: string }>;
  }) => {
    const { id } = await searchParams;
    const { data, error } = await getMealById({ id: id });
    const {data:userdata,error:userError}=await getUser();
    console.log("meal details data", data);
    const meal=data?.data;
    return (
        <div>
            <Banner routeName='Meal Details'/>
            <div className='container lg:mt-30 mt-10'>
            <div className="space-y-6 p-4">
      {/* Provider Info */}
      <Card>
        <CardHeader>
          <CardTitle>Provider Info</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 items-center">
          <Image
            src={meal?.provider?.image || '/default.jpg'}
            alt={meal?.provider?.name || 'Provider'}
            width={80}
            height={80}
            className="rounded-full"
          />

          <div>
            <p className="font-semibold text-lg">
              {meal?.provider?.name ?? 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground">
              {meal?.provider?.email ?? 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground">
              Role: {meal?.provider?.role ?? 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground">
              Status: {meal?.provider?.status ?? 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Restaurant Info */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-semibold">
            {meal?.provider?.ProviderProfiles?.restaurantName ?? 'N/A'}
          </p>
          <p className="text-sm text-muted-foreground">
            {meal?.provider?.ProviderProfiles?.description ?? 'N/A'}
          </p>
          <p className="text-sm text-muted-foreground">
            Address: {meal?.provider?.ProviderProfiles?.address ?? 'N/A'}
          </p>
          <p className="text-sm text-muted-foreground">
            Phone: {meal?.provider?.ProviderProfiles?.phone ?? 'N/A'}
          </p>
          <p className="text-sm text-muted-foreground">
            Hours:{' '}
            {meal?.provider?.ProviderProfiles?.openingTime ?? '--'} -{' '}
            {meal?.provider?.ProviderProfiles?.closingTime ?? '--'}
          </p>
          <p className="text-sm text-muted-foreground">
            Status:{' '}
            {meal?.provider?.ProviderProfiles?.isOpen
              ? 'Open'
              : 'Closed'}
          </p>
        </CardContent>
      </Card>

      {/* Meal Info */}
      <Card>
        <CardHeader>
          <CardTitle>Meal Info</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="w-32 h-32 bg-muted rounded-lg overflow-hidden">
            {meal?.image ? (
              <Image
                src={meal?.image}
                alt={meal?.name ?? 'Meal'}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          <div className="flex-1">
            <p className="font-semibold text-lg">
              {meal?.name ?? 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              {meal?.description ?? 'N/A'}
            </p>
            <p className="font-semibold text-accent mb-2">
              ${meal?.price?.toFixed?.(2) ?? '0.00'}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Category: {meal?.category?.name ?? 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Dietary: {meal?.dietaryPreferences ?? 'N/A'}
            </p>

            <div className="flex items-center gap-2">
              <Rating value={meal?.rating ?? 0} readOnly />
              <span className="text-sm text-muted-foreground">
                {(meal?.rating ?? 0).toFixed(1)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
          {/* Add Review */}
          {/* {
            (userdata?.data?.role === roles.customer) && (    <Card>
                <CardHeader>
                  <CardTitle>Add Review</CardTitle>
               
                </CardHeader>
        
                <CardContent className="space-y-4">
                <ReviewSection userId={userdata?.data?.id} mealId={meal?.id}/>
                </CardContent>
              </Card>)
          } */}
      
      {/* Reviews */}

      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>
            {!meal?.reviews?.length && 'No reviews yet.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {meal?.reviews?.map((review: any) => (
            <div
              key={review?.id}
              className="border rounded-lg p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">
                  {review?.user?.name ?? 'Anonymous'}
                </p>
                <Rating value={review?.rating ?? 0} readOnly />
              </div>
              <p className="text-sm text-muted-foreground">
                {review?.comment ?? ''}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
















            </div>
        </div>
    );
};

export default page;