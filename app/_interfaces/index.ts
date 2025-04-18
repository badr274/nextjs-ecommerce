export interface IProduct {
  id?: number;
  documentId?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: { url: string };
  instantDelivery: boolean;
  publishedAt?: Date;
  updatedAt?: Date;
  whatsIncluded?: string;
}
export interface IOrder {
  username: string;
  email: string;
  products: number | string[];
  amount: number;
}
