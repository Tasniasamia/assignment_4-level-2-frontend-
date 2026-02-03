// import { blogService } from '@/services/blog.service';
import UserTable from '@/components/modules/dashboard/admin/user-management/table';
import { PaginationCustom } from '@/components/modules/dashboard/common/pagination';
import { userService } from '@/services/user.service';
import React from 'react';

const page = async({
    searchParams
  }: {searchParams: Promise<{ page: string,limit:string }>
  }) => {
 const {page,limit}=await searchParams;
const pageInt=Number(page);
const limitInt=Number(limit);
// console.log("page",pageInt);
// console.log("limit",limit);
    const {data,error}=await userService.getUserByAdmin({page:pageInt,limit:limitInt});
 
    return (
        <div>
            <UserTable data={data?.data}/>
            <PaginationCustom meta={data?.pagination}/>
        </div>
    );
};

export default page;