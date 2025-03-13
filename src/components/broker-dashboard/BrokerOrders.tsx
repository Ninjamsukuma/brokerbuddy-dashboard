import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ChevronDown, ChevronUp, MapPin, Calendar, DollarSign } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type OrderStatus = 'completed' | 'in-progress' | 'pending' | 'cancelled';

const mockOrders = [
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
    status: 'completed' as OrderStatus,
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
    status: 'in-progress' as OrderStatus,
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
    status: 'pending' as OrderStatus,
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
    status: 'completed' as OrderStatus,
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
    status: 'completed' as OrderStatus,
    date: '2023-10-05',
    commission: '1,750,000 TZS',
    rating: 3,
    review: 'Good service but took longer than expected.',
  }
];

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusConfig = {
    completed: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Completed' },
    'in-progress': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'In Progress' },
    pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Pending' },
    cancelled: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Cancelled' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={`${config.color}`}>
      {config.label}
    </Badge>
  );
};

const RatingStars = ({ rating }: { rating: number | null }) => {
  if (rating === null) return <span className="text-gray-500 text-sm">Not rated yet</span>;

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-700">{rating}</span>
    </div>
  );
};

const BrokerOrders = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = activeTab === 'all'
    ? mockOrders
    : mockOrders.filter(order => order.status === activeTab);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getOrderSummary = () => {
    const completed = mockOrders.filter(o => o.status === 'completed').length;
    const inProgress = mockOrders.filter(o => o.status === 'in-progress').length;
    const pending = mockOrders.filter(o => o.status === 'pending').length;
    
    return { completed, inProgress, pending, total: mockOrders.length };
  };

  const summary = getOrderSummary();

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className="text-lg font-medium text-dalali-800 mb-4">Order Summary</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-dalali-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-semibold text-dalali-800">{summary.total}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-semibold text-green-700">{summary.completed}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-semibold text-blue-700">{summary.inProgress}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-semibold text-amber-700">{summary.pending}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <div className="px-4 pt-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="p-4">
            <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg overflow-hidden">
                    <div 
                      className="p-4 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer"
                      onClick={() => toggleOrderExpand(order.id)}
                    >
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <Avatar>
                          <AvatarImage src={order.client.avatar} alt={order.client.name} />
                          <AvatarFallback>{order.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-dalali-800">{order.property.title}</h4>
                          <p className="text-sm text-gray-600">{order.client.name}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between sm:justify-end space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
                        <OrderStatusBadge status={order.status} />
                        <div className="flex items-center">
                          {expandedOrder === order.id ? (
                            <ChevronUp size={20} className="text-gray-500" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {expandedOrder === order.id && (
                      <div className="p-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">Property Details</h5>
                            <div className="space-y-2">
                              <div className="flex items-start">
                                <MapPin size={16} className="text-gray-500 mr-2 mt-0.5" />
                                <p className="text-sm text-gray-600">{order.property.location}</p>
                              </div>
                              <div className="flex items-start">
                                <Calendar size={16} className="text-gray-500 mr-2 mt-0.5" />
                                <p className="text-sm text-gray-600">Order Date: {new Date(order.date).toLocaleDateString()}</p>
                              </div>
                              <div className="flex items-start">
                                <DollarSign size={16} className="text-gray-500 mr-2 mt-0.5" />
                                <div>
                                  <p className="text-sm text-gray-600">Price: {order.property.price}</p>
                                  <p className="text-sm text-gray-600">Commission: {order.commission}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">Client Feedback</h5>
                            {order.status === 'completed' ? (
                              <div className="space-y-2">
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Rating:</p>
                                  <RatingStars rating={order.rating} />
                                </div>
                                {order.review && (
                                  <div>
                                    <p className="text-sm font-medium text-gray-700">Review:</p>
                                    <p className="text-sm text-gray-600 italic">&quot;{order.review}&quot;</p>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">Feedback will be available after order is completed</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" size="sm">View Details</Button>
                          {order.status === 'pending' && (
                            <Button 
                              className="bg-dalali-600 text-white hover:bg-dalali-700" 
                              size="sm"
                              onClick={() => toast({
                                title: "Order Accepted",
                                description: "You have accepted this order",
                                duration: 3000,
                              })}
                            >
                              Accept Order
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No orders found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BrokerOrders;
