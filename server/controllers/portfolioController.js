import pool from '../config/database.js';

/**
 * Get all portfolios
 */
export const getPortfolios = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM portfolios ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      portfolios: result.rows
    });
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    res.status(500).json({
      error: 'Failed to fetch portfolios',
      message: error.message
    });
  }
};

/**
 * Get a specific portfolio by ID
 */
export const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM portfolios WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Portfolio not found'
      });
    }

    res.json({
      success: true,
      portfolio: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({
      error: 'Failed to fetch portfolio',
      message: error.message
    });
  }
};

/**
 * Create a new portfolio
 */
export const createPortfolio = async (req, res) => {
  try {
    const { name, initialCapital } = req.body;

    if (!name || !initialCapital) {
      return res.status(400).json({
        error: 'Missing required fields: name, initialCapital'
      });
    }

    const result = await pool.query(
      `INSERT INTO portfolios (name, initial_capital, current_capital)
       VALUES ($1, $2, $2)
       RETURNING *`,
      [name, initialCapital]
    );

    res.status(201).json({
      success: true,
      portfolio: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({
      error: 'Failed to create portfolio',
      message: error.message
    });
  }
};

/**
 * Update a portfolio
 */
export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, currentCapital } = req.body;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount++}`);
      values.push(name);
    }

    if (currentCapital !== undefined) {
      updates.push(`current_capital = $${paramCount++}`);
      values.push(currentCapital);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await pool.query(
      `UPDATE portfolios 
       SET ${updates.join(', ')}
       WHERE id = $${paramCount}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Portfolio not found'
      });
    }

    res.json({
      success: true,
      portfolio: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({
      error: 'Failed to update portfolio',
      message: error.message
    });
  }
};

/**
 * Get all positions for a portfolio
 */
export const getPortfolioPositions = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM portfolio_positions WHERE portfolio_id = $1`,
      [id]
    );

    res.json({
      success: true,
      positions: result.rows
    });
  } catch (error) {
    console.error('Error fetching portfolio positions:', error);
    res.status(500).json({
      error: 'Failed to fetch portfolio positions',
      message: error.message
    });
  }
};

/**
 * Add a position to a portfolio
 */
export const addPosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { symbol, quantity, averagePrice, currentPrice } = req.body;

    if (!symbol || !quantity || !averagePrice) {
      return res.status(400).json({
        error: 'Missing required fields: symbol, quantity, averagePrice'
      });
    }

    const unrealizedPnl = currentPrice
      ? (currentPrice - averagePrice) * quantity
      : 0;

    const result = await pool.query(
      `INSERT INTO portfolio_positions 
       (portfolio_id, symbol, quantity, average_price, current_price, unrealized_pnl)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, symbol, quantity, averagePrice, currentPrice || averagePrice, unrealizedPnl]
    );

    res.status(201).json({
      success: true,
      position: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding position:', error);
    res.status(500).json({
      error: 'Failed to add position',
      message: error.message
    });
  }
};

/**
 * Update a position
 */
export const updatePosition = async (req, res) => {
  try {
    const { id, positionId } = req.params;
    const { quantity, currentPrice } = req.body;

    // Get the position first to calculate unrealized P&L
    const positionResult = await pool.query(
      `SELECT * FROM portfolio_positions WHERE id = $1 AND portfolio_id = $2`,
      [positionId, id]
    );

    if (positionResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Position not found'
      });
    }

    const position = positionResult.rows[0];
    const newQuantity = quantity !== undefined ? quantity : position.quantity;
    const newCurrentPrice = currentPrice !== undefined ? currentPrice : position.current_price;
    const unrealizedPnl = (newCurrentPrice - position.average_price) * newQuantity;

    const result = await pool.query(
      `UPDATE portfolio_positions
       SET quantity = $1, current_price = $2, unrealized_pnl = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4 AND portfolio_id = $5
       RETURNING *`,
      [newQuantity, newCurrentPrice, unrealizedPnl, positionId, id]
    );

    res.json({
      success: true,
      position: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating position:', error);
    res.status(500).json({
      error: 'Failed to update position',
      message: error.message
    });
  }
};

/**
 * Delete a position
 */
export const deletePosition = async (req, res) => {
  try {
    const { id, positionId } = req.params;

    const result = await pool.query(
      `DELETE FROM portfolio_positions 
       WHERE id = $1 AND portfolio_id = $2
       RETURNING *`,
      [positionId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Position not found'
      });
    }

    res.json({
      success: true,
      message: 'Position deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting position:', error);
    res.status(500).json({
      error: 'Failed to delete position',
      message: error.message
    });
  }
};
