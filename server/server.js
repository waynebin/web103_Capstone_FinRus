import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import backtestRoutes from './routes/backtest.js';
import portfolioRoutes from './routes/portfolio.js';
import strategiesRoutes from './routes/strategies.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/backtest', backtestRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/strategies', strategiesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FinRus API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FinRus server running on port ${PORT}`);
});

export default app;
