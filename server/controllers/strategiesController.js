import pool from '../config/database.js';

/**
 * Get all strategies
 */
export const getStrategies = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM strategies ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      strategies: result.rows
    });
  } catch (error) {
    console.error('Error fetching strategies:', error);
    res.status(500).json({
      error: 'Failed to fetch strategies',
      message: error.message
    });
  }
};

/**
 * Get a specific strategy by ID
 */
export const getStrategyById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM strategies WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Strategy not found'
      });
    }

    res.json({
      success: true,
      strategy: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching strategy:', error);
    res.status(500).json({
      error: 'Failed to fetch strategy',
      message: error.message
    });
  }
};

/**
 * Create a new strategy
 */
export const createStrategy = async (req, res) => {
  try {
    const { name, description, type, parameters } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        error: 'Missing required fields: name, type'
      });
    }

    const result = await pool.query(
      `INSERT INTO strategies (name, description, type, parameters)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, description, type, JSON.stringify(parameters || {})]
    );

    res.status(201).json({
      success: true,
      strategy: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating strategy:', error);
    res.status(500).json({
      error: 'Failed to create strategy',
      message: error.message
    });
  }
};

/**
 * Update a strategy
 */
export const updateStrategy = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, parameters } = req.body;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount++}`);
      values.push(name);
    }

    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description);
    }

    if (type !== undefined) {
      updates.push(`type = $${paramCount++}`);
      values.push(type);
    }

    if (parameters !== undefined) {
      updates.push(`parameters = $${paramCount++}`);
      values.push(JSON.stringify(parameters));
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await pool.query(
      `UPDATE strategies 
       SET ${updates.join(', ')}
       WHERE id = $${paramCount}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Strategy not found'
      });
    }

    res.json({
      success: true,
      strategy: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating strategy:', error);
    res.status(500).json({
      error: 'Failed to update strategy',
      message: error.message
    });
  }
};

/**
 * Delete a strategy
 */
export const deleteStrategy = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM strategies WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Strategy not found'
      });
    }

    res.json({
      success: true,
      message: 'Strategy deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting strategy:', error);
    res.status(500).json({
      error: 'Failed to delete strategy',
      message: error.message
    });
  }
};
