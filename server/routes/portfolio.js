import express from 'express';
import {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  getPortfolioPositions,
  addPosition,
  updatePosition,
  deletePosition
} from '../controllers/portfolioController.js';

const router = express.Router();

// Portfolio routes
router.get('/', getPortfolios);
router.get('/:id', getPortfolioById);
router.post('/', createPortfolio);
router.put('/:id', updatePortfolio);

// Portfolio positions routes
router.get('/:id/positions', getPortfolioPositions);
router.post('/:id/positions', addPosition);
router.put('/:id/positions/:positionId', updatePosition);
router.delete('/:id/positions/:positionId', deletePosition);

export default router;
