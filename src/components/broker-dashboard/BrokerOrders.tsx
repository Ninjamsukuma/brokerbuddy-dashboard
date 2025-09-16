
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { OrderStatus } from './OrderStatusBadge';
import OrderSummary from './OrderSummary';
import OrderItem from './OrderItem';

interface BrokerOrdersProps {
  orders?: any[];
}

const BrokerOrders: React.FC<BrokerOrdersProps> = ({ orders = [] }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter(order => order.status === activeTab);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="space-y-4">
      <OrderSummary orders={orders} />
      
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
                  <OrderItem 
                    key={order.id}
                    order={order}
                    expandedOrder={expandedOrder}
                    toggleOrderExpand={toggleOrderExpand}
                  />
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
