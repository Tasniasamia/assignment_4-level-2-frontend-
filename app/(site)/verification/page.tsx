import Banner from "@/components/layout/banner";
import VerificationComponent from "@/components/modules/authentication/verificationComponent";
import React from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const token = (await searchParams).token;

  return (
    <div>
      <Banner routeName="Email Verification" />
      <VerificationComponent token={token}/>
    </div>
  );
}
