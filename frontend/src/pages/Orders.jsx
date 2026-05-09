import React, { useState } from 'react';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Orders = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock Orders
  const orders = [
    { id: 'ORD-001', customer: 'Alice Johnson', date: '2026-05-09', total: 299.99, status: 'Completed', items: 2 },
    { id: 'ORD-002', customer: 'Bob Smith', date: '2026-05-08', total: 149.50, status: 'Processing', items: 1 },
    { id: 'ORD-003', customer: 'Charlie Davis', date: '2026-05-08', total: 899.00, status: 'Pending', items: 4 },
    { id: 'ORD-004', customer: 'Diana Prince', date: '2026-05-07', total: 45.00, status: 'Completed', items: 1 },
    { id: 'ORD-005', customer: 'Evan Wright', date: '2026-05-06', total: 1250.00, status: 'Completed', items: 3 },
    { id: 'ORD-006', customer: 'Fiona Gallagher', date: '2026-05-05', total: 75.99, status: 'Cancelled', items: 2 },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed': return <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">Completed</span>;
      case 'Processing': return <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-medium">Processing</span>;
      case 'Pending': return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs font-medium">Pending</span>;
      case 'Cancelled': return <span className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-medium">Cancelled</span>;
      default: return null;
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-darkBg overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingCart className="text-indigo-600" /> Order History
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">View and track customer orders.</p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="Search orders..." className="input-field pl-9 py-2" />
              </div>
              <button className="btn-outline py-2 px-3 flex items-center gap-2">
                <Filter size={16} /> Filter
              </button>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                    <th className="pb-3 px-4 font-medium">Order ID</th>
                    <th className="pb-3 px-4 font-medium">Customer</th>
                    <th className="pb-3 px-4 font-medium">Date</th>
                    <th className="pb-3 px-4 font-medium">Items</th>
                    <th className="pb-3 px-4 font-medium">Total</th>
                    <th className="pb-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                      <td className="py-4 px-4 font-medium text-indigo-600 dark:text-indigo-400">{order.id}</td>
                      <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">{order.customer}</td>
                      <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{order.date}</td>
                      <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{order.items}</td>
                      <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</td>
                      <td className="py-4 px-4">{getStatusBadge(order.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-4">
              <span>Showing 1 to 6 of 42 entries</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50" disabled>Prev</button>
                <button className="px-3 py-1 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 rounded font-medium">1</button>
                <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800">2</button>
                <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800">3</button>
                <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
