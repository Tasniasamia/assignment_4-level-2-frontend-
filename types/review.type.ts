export interface Review {
    orderId:string;
    userId: string;
    mealId: string;
    rating: number;
    comment?: string;
}