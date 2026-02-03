import { getUser } from '@/actions/user.action';
import { UserProfileForm } from '@/components/modules/dashboard/common/userProfile';
import React from 'react';

const page =async () => {
    const {data,error}=await getUser();

    return (
        <main className="min-h-screen bg-background">
   
        <h1 className="mb-8 text-4xl font-bold">Profile Management</h1>
        <UserProfileForm
              initialData={data?.data}
            />

      </main>
    );
};

export default page;