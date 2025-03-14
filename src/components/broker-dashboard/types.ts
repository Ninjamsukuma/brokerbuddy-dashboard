
import { OrderStatus } from './OrderStatusBadge';

export interface Client {
  name: string;
  avatar: string;
}

export interface Property {
  title: string;
  type: string;
  price: string;
  location: string;
}

export interface Order {
  id: string;
  client: Client;
  property: Property;
  status: OrderStatus;
  date: string;
  commission: string;
  rating: number | null;
  review: string | null;
}

export interface SocialPlatform {
  name: 'whatsapp' | 'facebook' | 'instagram' | 'twitter' | 'telegram';
  label: string;
  color: string;
  icon: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  features: string[];
  description: string;
  images: string[];
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  createdAt: string;
}

export interface MarketingMaterial {
  id: string;
  propertyId: string;
  imageUrl: string;
  qrCodeUrl: string;
  caption: string;
  hashtags: string[];
  shares: number;
  views: number;
  leads: number;
  createdAt: string;
}
