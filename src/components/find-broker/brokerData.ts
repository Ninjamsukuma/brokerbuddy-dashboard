
import { BrokerProps } from '../shared/BrokerCard';

// Mock broker data with extended properties
export const brokers: BrokerProps[] = [
  {
    id: '1',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    reviewCount: 124,
    distance: '1.2 km',
    specialties: ['Real Estate', 'Apartments'],
    verified: true,
    online: true,
    priceLevel: 'high'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.7,
    reviewCount: 89,
    distance: '3.5 km',
    specialties: ['Car Sales', 'Insurance'],
    verified: true,
    online: true,
    priceLevel: 'medium'
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.5,
    reviewCount: 67,
    distance: '2.8 km',
    specialties: ['Rental', 'Residential'],
    verified: false,
    online: false,
    priceLevel: 'low'
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    reviewCount: 102,
    distance: '5.1 km',
    specialties: ['Clothing', 'Cosmetics'],
    verified: true,
    online: false,
    priceLevel: 'medium'
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.6,
    reviewCount: 75,
    distance: '4.3 km',
    specialties: ['Car Sales', 'Insurance'],
    verified: true,
    online: true,
    priceLevel: 'high'
  }
];
