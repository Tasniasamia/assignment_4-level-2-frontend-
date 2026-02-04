import { Role } from "./role.type";
import { userStatus } from "./userStatus.type";

export interface addCartType {
  userId: string;
  mealId: string;
  quantity: number;
}
export interface CartItemType {
    id: string;
    userId: string;
    mealId: string;
    orderId: string | null;
    quantity: number;
  
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      image: string | null;
      createdAt: string; // ISO date
      updatedAt: string; // ISO date
      role: Role;
      status: userStatus;
    };
  
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
      createdAt: string; // ISO date
      updatedAt: string; // ISO date
    };
    
  }

  export interface editCartType {
    id:string;
    userId: string;
    mealId: string;
    quantity: number;
  }
  