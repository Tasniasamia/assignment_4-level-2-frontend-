import { Slash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = ({routeName}:{routeName:string}) => {
  return (
    <div className="bg-linear-to-r min-h-72 from-primary to-secondary py-12 md:py-20 lg:mb-40 mb-20">
   <div className="container ">
        <div className="h-full pt-12 relative z-10 xl:ps-0 ps-6">
          <h1 className="font-roboto font-semibold md:text-5xl text-4xl text-white">
            {routeName}
          </h1>
          <div className="flex text-white gap-3 items-center md:text-2xl text-xl  font-medium font-roboto mt-6">
            <Link href="/home">Home</Link>
            /
            <span>{routeName}</span>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default Banner;
