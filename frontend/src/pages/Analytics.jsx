import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import KPICard from '../components/KPICard';

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock Data
  const trafficData = [
    { name: 'Mon', visitors: 4000, pageViews: 2400 },
    { name: 'Tue', visitors: 3000, pageViews: 1398 },
    { name: 'Wed', visitors: 2000, pageViews: 9800 },
    { name: 'Thu', visitors: 2780, pageViews: 3908 },
    { name: 'Fri', visitors: 1890, pageViews: 4800 },
    { name: 'Sat', visitors: 2390, pageViews: 3800 },
    { name: 'Sun', visitors: 3490, pageViews: 4300 },
  ];

  const conversionData = [
    { name: 'Week 1', rate: 2.4 },
    { name: 'Week 2', rate: 2.8 },
    { name: 'Week 3', rate: 3.2 },
    { name: 'Week 4', rate: 3.8 },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-darkBg overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="text-indigo-600" /> Analytics Deep Dive
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Detailed metrics on traffic and conversion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <KPICard title="Total Visitors" value="45,231" icon={<Users className="text-blue-500" />} trend="up" trendValue="14" />
            <KPICard title="Page Views" value="124,592" icon={<Eye className="text-purple-500" />} trend="up" trendValue="21" />
            <KPICard title="Conversion Rate" value="3.8%" icon={<TrendingUp className="text-green-500" />} trend="up" trendValue="5.2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Traffic Overview</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} />
                    <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="visitors" fill="#6366f1" radius={[4, 4, 0, 0]} name="Unique Visitors" />
                    <Bar dataKey="pageViews" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Page Views" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Conversion Rate Trend</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} tickFormatter={(v) => `${v}%`} />
                    <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={4} dot={{ r: 6 }} name="Conversion %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
