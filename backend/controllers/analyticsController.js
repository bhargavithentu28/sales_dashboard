import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Get Key Performance Indicators (KPIs)
// @route   GET /api/analytics/kpi
// @access  Private
export const getKPIs = async (req, res) => {
  try {
    const orders = await Order.find({});
    
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders === 0 ? 0 : totalRevenue / totalOrders;
    
    // Simplistic monthly growth calculation (assuming last month vs this month)
    // For demo purposes, we will mock the growth rate to 12.5%
    const monthlyGrowth = 12.5; 
    
    // Active customers (unique customer names)
    const uniqueCustomers = new Set(orders.map(order => order.customerName));
    const activeCustomers = uniqueCustomers.size;

    res.json({
      totalRevenue,
      totalOrders,
      averageOrderValue,
      monthlyGrowth,
      activeCustomers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Sales by Region
// @route   GET /api/analytics/sales-by-region
// @access  Private
export const getSalesByRegion = async (req, res) => {
  try {
    const salesByRegion = await Order.aggregate([
      {
        $group: {
          _id: '$region',
          totalSales: { $sum: '$totalAmount' }
        }
      },
      {
        $project: {
          name: '$_id',
          value: '$totalSales',
          _id: 0
        }
      }
    ]);
    res.json(salesByRegion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Revenue Trend
// @route   GET /api/analytics/revenue-trend
// @access  Private
export const getRevenueTrend = async (req, res) => {
  try {
    // Generate simple monthly data based on orders
    const trend = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const formattedTrend = trend.map(t => ({
      name: months[t._id - 1],
      revenue: t.revenue
    }));
    
    // If not enough data, pad it for demo
    if (formattedTrend.length === 0) {
      return res.json([
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 2000 },
        { name: 'Apr', revenue: 2780 },
        { name: 'May', revenue: 1890 },
        { name: 'Jun', revenue: 2390 },
        { name: 'Jul', revenue: 3490 },
      ]);
    }

    res.json(formattedTrend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Product Category Performance
// @route   GET /api/analytics/category-performance
// @access  Private
export const getCategoryPerformance = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          value: { $sum: '$salesCount' }
        }
      },
      {
        $project: {
          name: '$_id',
          value: 1,
          _id: 0
        }
      }
    ]);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
