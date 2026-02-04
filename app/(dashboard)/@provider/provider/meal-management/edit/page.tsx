import React from 'react';

const page = async ({
    searchParams,
  }: {
    searchParams: Promise<{ id: string}>;
  }) => {
    const { id} = await searchParams;
    return (
        <div>
            
        </div>
    );
};

export default page;