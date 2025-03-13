
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
