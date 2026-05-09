import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KPICard = ({ title, value, icon, trend, trendValue, delay = 0 }) => {
  const isPositive = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {icon}
        </div>
      </div>
      
      <div className="mt-auto flex items-center gap-2">
        <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
          {trendValue}%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
      </div>
    </motion.div>
  );
};

export default KPICard;
