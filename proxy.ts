"use server";

import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { roles } from "./constants/role";

export const proxy=async(request:NextRequest)=>{
   const {data,error}=await userService.getSession();
   const user=data?.data;
   let isAuthenticate=false;
   let isAdmin=false;
   let path=request.nextUrl.pathname;
   if(user){
    isAuthenticate=true;
    isAdmin=user?.role===roles.admin;

   }

   if(!isAuthenticate){
    return NextResponse.redirect(new URL('/login',request.url));

   }  
    if((isAdmin && path.startsWith('/customer')) || (isAdmin && path.startsWith('/provider'))){
    return  NextResponse.redirect(new URL('/admin',request.url));
    }

    if(((user?.role===roles.customer) && path.startsWith('/admin')) || ((user?.role===roles.customer) && path.startsWith('/provider'))){
    return  NextResponse.redirect(new URL('/customer',request.url));
    }
    if(((user?.role===roles.provider) && path.startsWith('/admin')) || ((user?.role===roles.provider) && path.startsWith('/customer'))){
        return  NextResponse.redirect(new URL('/provider',request.url));
        }
   return NextResponse.next();
}

export const config={
  matcher: ['/admin','/customer','/provider','/admin/:path*', '/customer/:path*','/provider/:path*']
}