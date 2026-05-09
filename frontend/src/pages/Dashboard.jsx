import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { DollarSign, ShoppingBag, Users, Activity, Download } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import KPICard from '../components/KPICard';
import { useAuth } from '../context/AuthContext';

const COLORS = ['#6366f1', '#06b6d4', '#a855f7', '#10b981', '#f59e0b'];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [kpiData, setKpiData] = useState(null);
  const [revenueTrend, setRevenueTrend] = useState([]);
  const [salesByRegion, setSalesByRegion] = useState([]);
  const [categoryPerformance, setCategoryPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const [kpiRes, trendRes, regionRes, categoryRes] = await Promise.all([
          axios.get('/api/analytics/kpi', config),
          axios.get('/api/analytics/revenue-trend', config),
          axios.get('/api/analytics/sales-by-region', config),
          axios.get('/api/analytics/category-performance', config),
        ]);

        setKpiData(kpiRes.data);
        setRevenueTrend(trendRes.data);
        setSalesByRegion(regionRes.data);
        setCategoryPerformance(categoryRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-darkCard p-3 border border-gray-200 dark:border-gray-800 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900 dark:text-white mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
              {entry.name}: {entry.name === 'revenue' || entry.name === 'value' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-darkBg items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-darkBg overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Welcome back, here's what's happening today.</p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input-field py-2"
              >
                <option value="daily">Today</option>
                <option value="weekly">This Week</option>
                <option value="monthly">This Month</option>
                <option value="yearly">This Year</option>
              </select>
              
              <button className="btn-outline flex items-center gap-2 py-2">
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard 
              title="Total Revenue" 
              value={formatCurrency(kpiData?.totalRevenue || 0)} 
              icon={<DollarSign className="text-indigo-600 dark:text-indigo-400" />} 
              trend="up" 
              trendValue="12.5" 
              delay={0.1}
            />
            <KPICard 
              title="Total Orders" 
              value={(kpiData?.totalOrders || 0).toLocaleString()} 
              icon={<ShoppingBag className="text-purple-600 dark:text-purple-400" />} 
              trend="up" 
              trendValue="8.2" 
              delay={0.2}
            />
            <KPICard 
              title="Average Order Value" 
              value={formatCurrency(kpiData?.averageOrderValue || 0)} 
              icon={<Activity className="text-cyan-600 dark:text-cyan-400" />} 
              trend="down" 
              trendValue="2.4" 
              delay={0.3}
            />
            <KPICard 
              title="Active Customers" 
              value={(kpiData?.activeCustomers || 0).toLocaleString()} 
              icon={<Users className="text-emerald-600 dark:text-emerald-400" />} 
              trend="up" 
              trendValue="14.6" 
              delay={0.4}
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="card lg:col-span-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Revenue Overview</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} tickFormatter={(val) => `$${val/1000}k`} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sales by Region</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesByRegion}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {salesByRegion.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Product Category Performance</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryPerformance} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#06b6d4" radius={[0, 4, 4, 0]}>
                      {categoryPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <ShoppingBag size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">New order received</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Customer {i + 1} ordered 3 items</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">$345.00</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{i * 2 + 1}h ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
