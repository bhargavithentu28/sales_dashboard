import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit2, Trash2, ShieldAlert } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ productName: '', category: '', price: 0, stock: 0 });
  const [editingId, setEditingId] = useState(null);
  
  const { user } = useAuth();

  const fetchProducts = async () => {
    // Mock Fetch
    setTimeout(() => {
      setProducts([
        { _id: '1', productName: 'Premium Wireless Headphones', category: 'Electronics', price: 299.99, stock: 50 },
        { _id: '2', productName: 'Ergonomic Office Chair', category: 'Furniture', price: 199.50, stock: 30 },
        { _id: '3', productName: 'Smart Fitness Watch', category: 'Electronics', price: 149.99, stock: 100 },
        { _id: '4', productName: 'Mechanical Keyboard', category: 'Electronics', price: 129.99, stock: 45 },
      ]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Mock Delete
      setProducts(products.filter(p => p._id !== id));
    }
  };

  const handleEdit = (product) => {
    setFormData({
      productName: product.productName,
      category: product.category,
      price: product.price,
      stock: product.stock
    });
    setEditingId(product._id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mock Submit
    if (editingId) {
      setProducts(products.map(p => p._id === editingId ? { ...p, ...formData } : p));
    } else {
      setProducts([...products, { _id: Date.now().toString(), ...formData }]);
    }
    setIsModalOpen(false);
    setFormData({ productName: '', category: '', price: 0, stock: 0 });
    setEditingId(null);
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="text-red-500" /> Admin Panel
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage products, users, and orders.</p>
            </div>
            
            <button 
              onClick={() => {
                setFormData({ productName: '', category: '', price: 0, stock: 0 });
                setEditingId(null);
                setIsModalOpen(true);
              }}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={16} /> Add Product
            </button>
          </div>

          <div className="card overflow-hidden">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 px-2">Products Directory</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                    <th className="pb-3 px-4 font-medium">Product</th>
                    <th className="pb-3 px-4 font-medium">Category</th>
                    <th className="pb-3 px-4 font-medium">Price</th>
                    <th className="pb-3 px-4 font-medium">Stock</th>
                    <th className="pb-3 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500">
                            <Package size={20} />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">{product.productName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{product.category}</td>
                      <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">${product.price}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          product.stock > 20 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {product.stock} in stock
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(product)} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(product._id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-darkCard rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-text">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.productName}
                  onChange={(e) => setFormData({...formData, productName: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Category</label>
                <input 
                  type="text" 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-text">Price ($)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-text">Stock</label>
                  <input 
                    type="number" 
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update' : 'Save'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
