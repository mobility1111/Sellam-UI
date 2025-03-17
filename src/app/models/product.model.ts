import { Company } from "./company.model";

export interface Product {
  id: string;
  companyId: string;
  company: Company;
  title: string;
  brand: string;
  categoryId: number;
  condition: string;
  year: string;
  model: string | null;
  isNegotiable: boolean;
  currency: string;
  price: number;
  description: string;
  rating: number;
  isApproved: boolean;
  isActive: boolean;
  isFavourite: boolean;
  images: string[];
  createdDate: string;
}
  
export interface ProductAd {
  id: number;
  productId?: number;
  title: string;
  currency: string;
  amount: number;
  adType: AdType;
  isActive?: boolean;
}

export enum AdType {
  Basic = 'Basic',
  Standard = 'Standard',
  Premium = 'Premium'
}