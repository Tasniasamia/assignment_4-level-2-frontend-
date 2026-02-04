export type MenuItemPayload = {
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
    providerId: string;
    categoryId: string;
    dietaryPreferences:string;
    rating: number;
  };
  

  export interface MealQueryOptions{
    categoryId?: string | undefined,
    dietaryPreferences?: string | undefined,
    price?: number | undefined,
    page?: number,
    limit?: number,
    skip?: number,
  }

  export type mealTableType = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string | null;
    isAvailable: boolean;
    providerId: string;
    categoryId: string;
    dietaryPreferences: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  
    provider?: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      image: string | null;
      createdAt: string;
      updatedAt: string;
      role: "provider" | "admin" | "customer";
      status: "activate" | "deactivate";
  
      ProviderProfiles?: {
        id: string;
        userId: string;
        restaurantName: string;
        description: string;
        phone: string;
        address: string;
        openingTime: string;
        closingTime: string;
        isOpen: boolean;
        createdAt: string;
        updatedAt: string;
      };
    };
  
    category: {
      id: string;
      name: string;
    };
  
    reviews?: any[];
  };
  