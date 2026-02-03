// "use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileForm } from "../../common/userProfile";
import { ProviderProfileForm } from "./providerProfile";
import { userType } from "@/types";
import { providerService } from "@/services/provider.service";



export default async function SettingTab({user}:{user:userType}) {

  
  const {data,error}=await providerService.getProvider({id:user?.id});
  return (
    <div>

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="user">User Profile</TabsTrigger>
            <TabsTrigger value="provider">Restaurant Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="mt-6">
            <UserProfileForm
              initialData={user}
            />
          </TabsContent>

          <TabsContent value="provider" className="mt-6">
            <ProviderProfileForm
              propData={data?.data}
            />
          </TabsContent>
        </Tabs>
      </div>
   
  );
}
