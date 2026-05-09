import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // We don't have user ref in product but it's okay for dummy data
    const sampleProducts = products.map((product) => {
      return { ...product };
    });

    const createdProducts = await Product.insertMany(sampleProducts);

    // Create random dummy orders
    const orders = [];
    const regions = ['North America', 'Europe', 'Asia', 'South America'];
    const statuses = ['Completed', 'Pending', 'Processing'];

    for (let i = 0; i < 50; i++) {
      const numProducts = Math.floor(Math.random() * 3) + 1;
      const orderProducts = [];
      let totalAmount = 0;

      for (let j = 0; j < numProducts; j++) {
        const randomProduct = createdProducts[Math.floor(Math.random() * createdProducts.length)];
        const qty = Math.floor(Math.random() * 5) + 1;
        orderProducts.push({
          product: randomProduct._id,
          quantity: qty,
          price: randomProduct.price
        });
        totalAmount += randomProduct.price * qty;
      }

      orders.push({
        customerName: `Customer ${i + 1}`,
        products: orderProducts,
        totalAmount,
        region: regions[Math.floor(Math.random() * regions.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Random date in past
      });
    }

    await Order.insertMany(orders);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
