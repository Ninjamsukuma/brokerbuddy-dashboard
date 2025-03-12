
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, PieChart as PieChartIcon } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Listing } from '@/types/listing';
import { cn } from '@/lib/utils';

interface BrokerStatisticsProps {
  listings: Listing[];
}

const BrokerStatistics: React.FC<BrokerStatisticsProps> = ({ listings }) => {
  const { t } = useLanguage();
  
  // Generate weekly views data (last 7 days)
  const generateWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      name: day,
      views: Math.floor(Math.random() * 50) + 10, // Random data between 10-60
    }));
  };

  // Calculate conversion rates (views to inquiries)
  const calculateConversionData = () => {
    return [
      { name: t('brokerStats.viewToInquiry'), value: 18 },
      { name: t('brokerStats.inquiryToVisit'), value: 42 },
      { name: t('brokerStats.visitToOffer'), value: 28 },
      { name: t('brokerStats.offerToSale'), value: 12 },
    ];
  };

  // Calculate popular categories
  const calculateCategoryData = () => {
    const categories: Record<string, number> = {};
    
    listings.forEach(listing => {
      if (categories[listing.type]) {
        categories[listing.type]++;
      } else {
        categories[listing.type] = 1;
      }
    });
    
    return Object.keys(categories).map(key => ({
      name: key,
      value: categories[key],
    }));
  };
  
  const weeklyData = generateWeeklyData();
  const conversionData = calculateConversionData();
  const categoryData = calculateCategoryData();
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{t('brokerStats.detailedAnalytics')}</h2>
      
      {/* Weekly Views */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center mb-3">
          <TrendingUp size={20} className="text-dalali-600 mr-2" />
          <h3 className="font-medium">{t('brokerStats.weeklyViews')}</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weeklyData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#435c84" 
                strokeWidth={2} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Conversion Rates */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center mb-3">
          <Users size={20} className="text-dalali-600 mr-2" />
          <h3 className="font-medium">{t('brokerStats.conversionRates')}</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={conversionData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" fontSize={10} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="value" fill="#435c84" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Popular Categories */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center mb-3">
          <PieChartIcon size={20} className="text-dalali-600 mr-2" />
          <h3 className="font-medium">{t('brokerStats.popularCategories')}</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BrokerStatistics;
