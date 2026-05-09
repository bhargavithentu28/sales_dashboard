import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Shield, ArrowRight, Activity } from 'lucide-react';

const Landing = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-darkBg dark:to-indigo-950/20 overflow-hidden">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
            SalesVision
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition">Features</a>
          <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition">Testimonials</a>
          <div className="flex gap-4 items-center">
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition font-semibold">Log In</Link>
            <Link to="/register" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              New: AI Sales Forecasting Engine
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              Visualize Your Sales. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                Accelerate Growth.
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-xl">
              The ultimate analytics dashboard for modern sales teams. Track revenue, monitor real-time orders, and uncover hidden trends with intuitive, beautiful visualizations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary flex items-center gap-2 text-lg px-8 py-3">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="btn-outline flex items-center gap-2 text-lg px-8 py-3 bg-white dark:bg-transparent">
                View Demo
              </Link>
            </div>
            
            <div className="mt-10 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <img key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-darkBg" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                ))}
              </div>
              <p>Trusted by 10,000+ sales professionals</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Decorative background blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-300/30 to-cyan-300/30 dark:from-indigo-900/40 dark:to-cyan-900/40 blur-3xl rounded-full -z-10" />
            
            <div className="w-full h-auto glass rounded-2xl p-4 shadow-2xl border border-white/40 dark:border-gray-700/50 transform rotate-1 hover:rotate-0 transition-transform duration-500">
               {/* Mock Dashboard UI inside the hero image area */}
               <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-inner">
                  <div className="bg-white dark:bg-darkCard px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-4">
                    <div className="col-span-2 h-32 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-100 dark:border-indigo-900/50 flex items-end p-4">
                      {/* Fake Chart */}
                      <div className="w-full flex items-end justify-between gap-2 h-16">
                        {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                          <div key={i} className="w-full bg-indigo-500 rounded-t-sm opacity-80" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>
                    <div className="h-24 bg-white dark:bg-darkCard rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
                      <div className="text-gray-400 text-xs mb-1">Total Revenue</div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">$124,500</div>
                    </div>
                    <div className="h-24 bg-white dark:bg-darkCard rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
                      <div className="text-gray-400 text-xs mb-1">Active Users</div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">2,405</div>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-darkCard relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything you need to scale</h2>
            <p className="text-gray-600 dark:text-gray-400">Powerful features designed to give you complete visibility into your sales pipeline and team performance.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition group">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Real-time Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">Watch your sales grow in real-time with instant updates and dynamic charting capabilities.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition group">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Activity className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Predictive Forecasting</h3>
              <p className="text-gray-600 dark:text-gray-400">Leverage historical data to predict future trends and make informed business decisions.</p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition group">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Enterprise Security</h3>
              <p className="text-gray-600 dark:text-gray-400">Bank-grade encryption and role-based access control keep your sensitive data completely secure.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
