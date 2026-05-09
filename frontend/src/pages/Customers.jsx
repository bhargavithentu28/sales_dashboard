import React, { useState } from 'react';
import { Users, Mail, Phone, MapPin, MoreVertical } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Customers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const customers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 (555) 123-4567', location: 'New York, USA', status: 'Active', spend: 2450.00 },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '+1 (555) 987-6543', location: 'London, UK', status: 'Inactive', spend: 450.50 },
    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', phone: '+1 (555) 456-7890', location: 'Sydney, AUS', status: 'Active', spend: 3200.75 },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', phone: '+1 (555) 789-0123', location: 'Toronto, CAN', status: 'Active', spend: 890.00 },
    { id: 5, name: 'Evan Wright', email: 'evan@example.com', phone: '+1 (555) 321-0987', location: 'Berlin, GER', status: 'New', spend: 125.00 },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-darkBg overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="text-indigo-600" /> Customer Directory
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your customer relationships and view lifetime value.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((customer) => (
              <div key={customer.id} className="card relative">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <MoreVertical size={16} />
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <img src={`https://i.pravatar.cc/150?u=${customer.email}`} alt={customer.name} className="w-16 h-16 rounded-full border-2 border-indigo-100 dark:border-indigo-900" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{customer.name}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      customer.status === 'New' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
                      'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {customer.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Mail size={16} className="text-gray-400" /> {customer.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Phone size={16} className="text-gray-400" /> {customer.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="text-gray-400" /> {customer.location}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Lifetime Spend</span>
                  <span className="font-bold text-gray-900 dark:text-white">${customer.spend.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Customers;
