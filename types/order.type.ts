import { orderStatus } from "./orderStatus.type";
import { userType } from "./user";

export interface CreateOrderPayload {
    userId: string;
    deliveryAddress: string;
    items: {
      connect: {
        id: string;
      }[];
    };
  }
  

  export type OrderDetailsType = {
    id: string;
    customerId: string;
    status:orderStatus;
    totalAmount: number;
    deliveryAddress: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
    items: {
      id: string;
      userId: string;
      mealId: string;
      orderId: string;
      quantity: number;
      meal: {
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
        provider: {
          id: string;
          name: string;
          email: string;
          emailVerified: boolean;
          image: string | null;
          createdAt: string;
          updatedAt: string;
          role: 'provider';
          status: 'activate' | 'deactivate';
          ProviderProfiles: {
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
      };
    }[],
    userdata:userType;
  };
  

 