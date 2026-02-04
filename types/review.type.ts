export interface Review {
    userId: string;
    mealId: string;
    rating: number;
    comment?: string;
}