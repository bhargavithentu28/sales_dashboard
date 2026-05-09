import express from 'express';
import {
  getKPIs,
  getSalesByRegion,
  getRevenueTrend,
  getCategoryPerformance,
} from '../controllers/analyticsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/kpi').get(protect, getKPIs);
router.route('/sales-by-region').get(protect, getSalesByRegion);
router.route('/revenue-trend').get(protect, getRevenueTrend);
router.route('/category-performance').get(protect, getCategoryPerformance);

export default router;
