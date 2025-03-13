
import { Order } from './types';

export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    client: {
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    property: {
      title: '2BR Apartment in Kinondoni',
      type: 'Rental',
      price: '500,000 TZS/month',
      location: 'Kinondoni, Dar es Salaam',
    },
    status: 'completed',
    date: '2023-10-15',
    commission: '250,000 TZS',
    rating: 5,
    review: 'Excellent service! Very professional and responsive.',
  },
  {
    id: 'ord-002',
    client: {
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    property: {
      title: 'Toyota Hilux 2020',
      type: 'Vehicle Sale',
      price: '45,000,000 TZS',
      location: 'Mikocheni, Dar es Salaam',
    },
    status: 'in-progress',
    date: '2023-11-05',
    commission: 'Pending',
    rating: null,
    review: null,
  },
  {
    id: 'ord-003',
    client: {
      name: 'Carol White',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    property: {
      title: 'Commercial Space in CBD',
      type: 'Commercial Lease',
      price: '2,500,000 TZS/month',
      location: 'CBD, Dar es Salaam',
    },
    status: 'pending',
    date: '2023-11-10',
    commission: 'Pending',
    rating: null,
    review: null,
  },
  {
    id: 'ord-004',
    client: {
      name: 'David Brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    property: {
      title: 'Land in Mbezi Beach',
      type: 'Land Sale',
      price: '150,000,000 TZS',
      location: 'Mbezi Beach, Dar es Salaam',
    },
    status: 'completed',
    date: '2023-09-20',
    commission: '7,500,000 TZS',
    rating: 4,
    review: 'Great broker, helped me find exactly what I was looking for.',
  },
  {
    id: 'ord-005',
    client: {
      name: 'Eve Taylor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    property: {
      title: 'Mercedes Benz C200 2019',
      type: 'Vehicle Sale',
      price: '35,000,000 TZS',
      location: 'Masaki, Dar es Salaam',
    },
    status: 'completed',
    date: '2023-10-05',
    commission: '1,750,000 TZS',
    rating: 3,
    review: 'Good service but took longer than expected.',
  }
];
