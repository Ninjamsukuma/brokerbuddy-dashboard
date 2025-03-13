
import React from 'react';
import { Order } from './types';

interface OrderSummaryProps {
  orders: Order[];
}

const OrderSummary = ({ orders }: OrderSummaryProps) => {
  const getOrderSummary = () => {
    const completed = orders.filter(o => o.status === 'completed').length;
    const inProgress = orders.filter(o => o.status === 'in-progress').length;
    const pending = orders.filter(o => o.status === 'pending').length;
    
    return { completed, inProgress, pending, total: orders.length };
  };

  const summary = getOrderSummary();

  return (
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
  );
};

export default OrderSummary;
