import React, { useState } from 'react';
import { Package, Search, Tag, Star } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Products = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const products = [
    { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', price: 299.99, rating: 4.8, sales: 1200, image: '🎧' },
    { id: 2, name: 'Ergonomic Office Chair', category: 'Furniture', price: 199.50, rating: 4.5, sales: 850, image: '🪑' },
    { id: 3, name: 'Smart Fitness Watch', category: 'Electronics', price: 149.99, rating: 4.7, sales: 3000, image: '⌚' },
    { id: 4, name: 'Mechanical Keyboard', category: 'Electronics', price: 129.99, rating: 4.9, sales: 600, image: '⌨️' },
    { id: 5, name: 'Stainless Steel Water Bottle', category: 'Accessories', price: 24.99, rating: 4.6, sales: 5000, image: '🍼' },
    { id: 6, name: 'Standing Desk', category: 'Furniture', price: 450.00, rating: 4.8, sales: 250, image: '🗄️' },
    { id: 7, name: 'Noise-Cancelling Earbuds', category: 'Electronics', price: 179.99, rating: 4.4, sales: 1500, image: '👂' },
    { id: 8, name: 'Leather Laptop Sleeve', category: 'Accessories', price: 49.99, rating: 4.7, sales: 920, image: '💼' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-darkBg overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Package className="text-indigo-600" /> Product Catalog
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Browse all available products and their metrics.</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="text" placeholder="Search products..." className="input-field pl-9 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="card group hover:scale-[1.02] transition-transform duration-300">
                <div className="h-40 w-full bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center text-6xl shadow-inner relative overflow-hidden">
                  {product.image}
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" /> {product.rating}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                  <Tag size={12} /> {product.category}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 line-clamp-1" title={product.name}>
                  {product.name}
                </h3>
                <div className="flex justify-between items-end mt-4">
                  <span className="text-xl font-black text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {product.sales.toLocaleString()} sold
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
