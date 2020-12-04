import { ShippingData } from "./shipping";

export class OrderItem{
        user: {
            userId: string;
            name: string;
            email: string;
        };
        totalCartPrice: number;
        datePlaced: number;
        shipping: ShippingData;
        items: {
            product: {
                title: string;
                price: number;
                imageUrl: string;
                category: string;
            };
            quantity: number;
            totalCost: number;
        }[];

    
    
    
    
    
    
    
    
}