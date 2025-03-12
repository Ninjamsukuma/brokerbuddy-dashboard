
import { Listing } from '@/types/listing';

export const mockListings: Listing[] = [
  {
    id: '1',
    title: '3 Bedroom Apartment in Westlands',
    price: 25000000,
    location: 'Westlands, Nairobi',
    type: 'Apartment',
    status: 'active',
    featured: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&q=80',
    createdAt: '2023-09-15',
    views: 245
  },
  {
    id: '2',
    title: 'Toyota RAV4 2020 Model',
    price: 3500000,
    location: 'Kilimani, Nairobi',
    type: 'Vehicle',
    status: 'active',
    featured: false,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=350&q=80',
    createdAt: '2023-10-05',
    views: 189
  },
  {
    id: '3',
    title: 'Office Space for Rent',
    price: 150000,
    location: 'CBD, Nairobi',
    type: 'Commercial',
    status: 'pending',
    featured: false,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&w=350&q=80',
    createdAt: '2023-10-12',
    views: 97
  },
  {
    id: '4',
    title: 'Mercedes Benz C200',
    price: 4200000,
    location: 'Lavington, Nairobi',
    type: 'Vehicle',
    status: 'sold',
    featured: false,
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&w=350&q=80',
    createdAt: '2023-08-25',
    views: 324
  }
];
