import express from 'express';
import {
  runBacktest,
  getBacktestResults,
  getBacktestById
} from '../controllers/backtestController.js';

const router = express.Router();

// Run a new backtest
router.post('/run', runBacktest);

// Get all backtest results
router.get('/results', getBacktestResults);

// Get a specific backtest result
router.get('/results/:id', getBacktestById);

export default router;
