import express from 'express';
import {
  getOrders,
  createOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getOrders).post(protect, createOrder);
router.route('/:id').delete(protect, admin, deleteOrder);

export default router;
