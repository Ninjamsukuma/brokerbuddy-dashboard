
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, MapPin, Calendar, DollarSign } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import OrderStatusBadge from './OrderStatusBadge';
import RatingStars from './RatingStars';
import { Order } from './types';

interface OrderItemProps {
  order: Order;
  expandedOrder: string | null;
  toggleOrderExpand: (orderId: string) => void;
}

const OrderItem = ({ order, expandedOrder, toggleOrderExpand }: OrderItemProps) => {
  return (
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
  );
};

export default OrderItem;
