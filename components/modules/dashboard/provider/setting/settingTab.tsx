"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileForm } from "../../common/userProfile";
import { ProviderProfileForm } from "./providerProfile";

// Sample user data
const sampleUserData = {
  id: "H784LedW7Y4o3MqjtjAm73tn146TX8kq",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  role: "provider" as const,
  status: "activate" as const,
  createdAt: "2026-01-31T19:27:50.185Z",
  updatedAt: "2026-01-31T19:28:22.622Z",
};

// Sample provider data
const sampleProviderData = {
  id: "cml4hjtjk0001w6ho557uaqbq",
  userId: "H784LedW7Y4o3MqjtjAm73tn146TX8kq",
  restaurantName: "Foodies Hub",
  description: "The best fast food restaurant in Dhaka",
  phone: "01712345678",
  address: "Dhanmondi 32, Dhaka",
  openingTime: "10:00 AM",
  closingTime: "11:00 PM",
  isOpen: true,
  createdAt: "2026-02-02T01:23:02.097Z",
  updatedAt: "2026-02-02T01:23:02.097Z",
};

export default function SettingTab() {
  const handleUserSubmit = async (data: any) => {
    console.log("User profile updated:", data);
    // Add your API call here
    // await updateUserProfile(data);
  };

  const handleProviderSubmit = async (data: any) => {
    console.log("Provider profile updated:", data);
    // Add your API call here
    // await updateProviderProfile(data);
  };

  return (
    <div>

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="user">User Profile</TabsTrigger>
            <TabsTrigger value="provider">Restaurant Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="mt-6">
            <UserProfileForm
              initialData={sampleUserData}
              onSubmit={handleUserSubmit}
            />
          </TabsContent>

          <TabsContent value="provider" className="mt-6">
            <ProviderProfileForm
              initialData={sampleProviderData}
              onSubmit={handleProviderSubmit}
            />
          </TabsContent>
        </Tabs>
      </div>
   
  );
}
