export interface providerType{
        id: string,
        userId?: string,
        restaurantName?: string,
        description?: string,
        phone?: string,
        address?: string,
        openingTime?: string,
        closingTime?: string,
        isOpen?: boolean,
        createdAt?: string | number | Date,
        updatedAt?: string | number | Date
}