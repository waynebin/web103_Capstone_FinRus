import BacktestingEngine, { SMAStrategy, RSIStrategy } from '../services/backtesting.js';
import pool from '../config/database.js';

/**
 * Run a backtest
 */
export const runBacktest = async (req, res) => {
  try {
    const {
      strategyType,
      strategyParams,
      symbol,
      startDate,
      endDate,
      initialCapital = 10000
    } = req.body;

    // Validate required fields
    if (!strategyType || !symbol || !startDate || !endDate) {
      return res.status(400).json({
        error: 'Missing required fields: strategyType, symbol, startDate, endDate'
      });
    }

    // Fetch historical data
    const result = await pool.query(
      `SELECT date, open, high, low, close, volume 
       FROM historical_prices 
       WHERE symbol = $1 AND date BETWEEN $2 AND $3 
       ORDER BY date ASC`,
      [symbol, startDate, endDate]
    );

    if (result.rows.length === 0) {
      // If no data in database, generate sample data for demonstration
      const historicalData = generateSampleData(symbol, startDate, endDate);
      
      // Create strategy
      let strategy;
      if (strategyType === 'SMA') {
        const { shortPeriod = 20, longPeriod = 50 } = strategyParams || {};
        strategy = new SMAStrategy(shortPeriod, longPeriod);
      } else if (strategyType === 'RSI') {
        const { period = 14, oversold = 30, overbought = 70 } = strategyParams || {};
        strategy = new RSIStrategy(period, oversold, overbought);
      } else {
        return res.status(400).json({ error: 'Invalid strategy type' });
      }

      // Run backtest
      const engine = new BacktestingEngine(strategy, historicalData, initialCapital);
      const backtestResults = engine.run();

      // Save results to database (optional)
      try {
        const insertResult = await pool.query(
          `INSERT INTO backtest_results 
           (symbol, start_date, end_date, initial_capital, final_capital, 
            total_return, sharpe_ratio, max_drawdown, win_rate, total_trades, trades)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           RETURNING id`,
          [
            symbol,
            startDate,
            endDate,
            backtestResults.initialCapital,
            backtestResults.finalCapital,
            backtestResults.totalReturn,
            backtestResults.sharpeRatio,
            backtestResults.maxDrawdown,
            backtestResults.winRate,
            backtestResults.totalTrades,
            JSON.stringify(backtestResults.trades)
          ]
        );

        backtestResults.id = insertResult.rows[0].id;
      } catch (dbError) {
        console.error('Error saving backtest results:', dbError);
        // Continue even if saving fails
      }

      return res.json({
        success: true,
        results: backtestResults
      });
    }

    const historicalData = result.rows.map(row => ({
      date: row.date,
      open: parseFloat(row.open),
      high: parseFloat(row.high),
      low: parseFloat(row.low),
      close: parseFloat(row.close),
      volume: parseInt(row.volume)
    }));

    // Create strategy
    let strategy;
    if (strategyType === 'SMA') {
      const { shortPeriod = 20, longPeriod = 50 } = strategyParams || {};
      strategy = new SMAStrategy(shortPeriod, longPeriod);
    } else if (strategyType === 'RSI') {
      const { period = 14, oversold = 30, overbought = 70 } = strategyParams || {};
      strategy = new RSIStrategy(period, oversold, overbought);
    } else {
      return res.status(400).json({ error: 'Invalid strategy type' });
    }

    // Run backtest
    const engine = new BacktestingEngine(strategy, historicalData, initialCapital);
    const backtestResults = engine.run();

    // Save results to database
    const insertResult = await pool.query(
      `INSERT INTO backtest_results 
       (symbol, start_date, end_date, initial_capital, final_capital, 
        total_return, sharpe_ratio, max_drawdown, win_rate, total_trades, trades)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id`,
      [
        symbol,
        startDate,
        endDate,
        backtestResults.initialCapital,
        backtestResults.finalCapital,
        backtestResults.totalReturn,
        backtestResults.sharpeRatio,
        backtestResults.maxDrawdown,
        backtestResults.winRate,
        backtestResults.totalTrades,
        JSON.stringify(backtestResults.trades)
      ]
    );

    backtestResults.id = insertResult.rows[0].id;

    res.json({
      success: true,
      results: backtestResults
    });
  } catch (error) {
    console.error('Error running backtest:', error);
    res.status(500).json({
      error: 'Failed to run backtest',
      message: error.message
    });
  }
};

/**
 * Get all backtest results
 */
export const getBacktestResults = async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const result = await pool.query(
      `SELECT id, symbol, start_date, end_date, initial_capital, final_capital,
              total_return, sharpe_ratio, max_drawdown, win_rate, total_trades, created_at
       FROM backtest_results
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({
      success: true,
      results: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching backtest results:', error);
    res.status(500).json({
      error: 'Failed to fetch backtest results',
      message: error.message
    });
  }
};

/**
 * Get a specific backtest result by ID
 */
export const getBacktestById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM backtest_results WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Backtest result not found'
      });
    }

    res.json({
      success: true,
      result: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching backtest result:', error);
    res.status(500).json({
      error: 'Failed to fetch backtest result',
      message: error.message
    });
  }
};

/**
 * Generate sample historical data for demonstration
 */
function generateSampleData(symbol, startDate, endDate) {
  const data = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  let currentPrice = 100;

  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    // Random walk with slight upward bias
    const change = (Math.random() - 0.48) * 2;
    currentPrice = Math.max(currentPrice + change, 10);

    const open = currentPrice;
    const high = currentPrice + Math.random() * 2;
    const low = currentPrice - Math.random() * 2;
    const close = low + Math.random() * (high - low);

    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000)
    });
  }

  return data;
}
