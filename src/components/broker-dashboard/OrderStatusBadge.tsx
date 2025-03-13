
import React from 'react';
import { Badge } from '@/components/ui/badge';

export type OrderStatus = 'completed' | 'in-progress' | 'pending' | 'cancelled';

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

export default OrderStatusBadge;
