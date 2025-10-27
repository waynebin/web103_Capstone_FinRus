import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';
import './Portfolio.css';

function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [positions, setPositions] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAddPosition, setShowAddPosition] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newPortfolio, setNewPortfolio] = useState({
    name: '',
    initialCapital: 10000
  });

  const [newPosition, setNewPosition] = useState({
    symbol: '',
    quantity: 0,
    averagePrice: 0,
    currentPrice: 0
  });

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      const data = await portfolioAPI.getAll();
      setPortfolios(data.portfolios || []);
    } catch (err) {
      console.error('Error loading portfolios:', err);
    }
  };

  const loadPositions = async (portfolioId) => {
    try {
      const data = await portfolioAPI.getPositions(portfolioId);
      setPositions(data.positions || []);
    } catch (err) {
      console.error('Error loading positions:', err);
    }
  };

  const handleSelectPortfolio = async (portfolio) => {
    setSelectedPortfolio(portfolio);
    await loadPositions(portfolio.id);
  };

  const handleCreatePortfolio = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await portfolioAPI.create(newPortfolio);
      setShowCreateForm(false);
      setNewPortfolio({ name: '', initialCapital: 10000 });
      await loadPortfolios();
    } catch (err) {
      console.error('Error creating portfolio:', err);
      alert('Failed to create portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPosition = async (e) => {
    e.preventDefault();
    if (!selectedPortfolio) return;

    setLoading(true);

    try {
      await portfolioAPI.addPosition(selectedPortfolio.id, newPosition);
      setShowAddPosition(false);
      setNewPosition({ symbol: '', quantity: 0, averagePrice: 0, currentPrice: 0 });
      await loadPositions(selectedPortfolio.id);
    } catch (err) {
      console.error('Error adding position:', err);
      alert('Failed to add position');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePosition = async (positionId) => {
    if (!selectedPortfolio || !window.confirm('Are you sure you want to delete this position?')) {
      return;
    }

    try {
      await portfolioAPI.deletePosition(selectedPortfolio.id, positionId);
      await loadPositions(selectedPortfolio.id);
    } catch (err) {
      console.error('Error deleting position:', err);
      alert('Failed to delete position');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const calculateTotalValue = () => {
    const positionsValue = positions.reduce((sum, pos) => {
      return sum + (parseFloat(pos.current_price) * parseInt(pos.quantity));
    }, 0);
    return positionsValue;
  };

  const calculateTotalPnL = () => {
    return positions.reduce((sum, pos) => sum + parseFloat(pos.unrealized_pnl || 0), 0);
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h1>Portfolio Monitoring</h1>
        <button 
          className="primary-btn" 
          onClick={() => setShowCreateForm(true)}
        >
          + Create Portfolio
        </button>
      </div>

      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Portfolio</h2>
            <form onSubmit={handleCreatePortfolio}>
              <div className="form-group">
                <label>Portfolio Name</label>
                <input
                  type="text"
                  value={newPortfolio.name}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Initial Capital</label>
                <input
                  type="number"
                  value={newPortfolio.initialCapital}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, initialCapital: e.target.value })}
                  min="1000"
                  step="1000"
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={() => setShowCreateForm(false)} className="secondary-btn">
                  Cancel
                </button>
                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="portfolio-layout">
        <div className="portfolio-list-section">
          <div className="card">
            <h3>Your Portfolios</h3>
            {portfolios.length === 0 ? (
              <p className="empty-message">No portfolios yet. Create your first portfolio to get started!</p>
            ) : (
              <div className="portfolio-list">
                {portfolios.map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className={`portfolio-item ${selectedPortfolio?.id === portfolio.id ? 'active' : ''}`}
                    onClick={() => handleSelectPortfolio(portfolio)}
                  >
                    <div className="portfolio-name">{portfolio.name}</div>
                    <div className="portfolio-capital">
                      {formatCurrency(portfolio.current_capital)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="portfolio-details-section">
          {selectedPortfolio ? (
            <>
              <div className="card">
                <div className="portfolio-overview">
                  <h2>{selectedPortfolio.name}</h2>
                  <div className="overview-metrics">
                    <div className="overview-metric">
                      <div className="overview-label">Initial Capital</div>
                      <div className="overview-value">
                        {formatCurrency(selectedPortfolio.initial_capital)}
                      </div>
                    </div>
                    <div className="overview-metric">
                      <div className="overview-label">Current Cash</div>
                      <div className="overview-value">
                        {formatCurrency(selectedPortfolio.current_capital)}
                      </div>
                    </div>
                    <div className="overview-metric">
                      <div className="overview-label">Positions Value</div>
                      <div className="overview-value">
                        {formatCurrency(calculateTotalValue())}
                      </div>
                    </div>
                    <div className="overview-metric">
                      <div className="overview-label">Total P&L</div>
                      <div className="overview-value" 
                        style={{ color: calculateTotalPnL() >= 0 ? '#4CAF50' : '#f44336' }}>
                        {formatCurrency(calculateTotalPnL())}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="positions-header">
                  <h3>Positions</h3>
                  <button 
                    className="primary-btn" 
                    onClick={() => setShowAddPosition(true)}
                  >
                    + Add Position
                  </button>
                </div>

                {positions.length === 0 ? (
                  <p className="empty-message">No positions yet. Add a position to start tracking!</p>
                ) : (
                  <div className="positions-table-container">
                    <table className="positions-table">
                      <thead>
                        <tr>
                          <th>Symbol</th>
                          <th>Quantity</th>
                          <th>Avg Price</th>
                          <th>Current Price</th>
                          <th>Market Value</th>
                          <th>Unrealized P&L</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions.map((position) => (
                          <tr key={position.id}>
                            <td className="symbol-cell">{position.symbol}</td>
                            <td>{position.quantity}</td>
                            <td>${parseFloat(position.average_price).toFixed(2)}</td>
                            <td>${parseFloat(position.current_price).toFixed(2)}</td>
                            <td>{formatCurrency(position.quantity * position.current_price)}</td>
                            <td style={{ color: position.unrealized_pnl >= 0 ? '#4CAF50' : '#f44336' }}>
                              {formatCurrency(position.unrealized_pnl)}
                            </td>
                            <td>
                              <button 
                                className="danger-btn small-btn"
                                onClick={() => handleDeletePosition(position.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {showAddPosition && (
                <div className="modal-overlay" onClick={() => setShowAddPosition(false)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Add Position</h2>
                    <form onSubmit={handleAddPosition}>
                      <div className="form-group">
                        <label>Symbol</label>
                        <input
                          type="text"
                          value={newPosition.symbol}
                          onChange={(e) => setNewPosition({ ...newPosition, symbol: e.target.value.toUpperCase() })}
                          placeholder="e.g., AAPL"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Quantity</label>
                        <input
                          type="number"
                          value={newPosition.quantity}
                          onChange={(e) => setNewPosition({ ...newPosition, quantity: e.target.value })}
                          min="1"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Average Price</label>
                        <input
                          type="number"
                          value={newPosition.averagePrice}
                          onChange={(e) => setNewPosition({ ...newPosition, averagePrice: e.target.value })}
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Current Price</label>
                        <input
                          type="number"
                          value={newPosition.currentPrice}
                          onChange={(e) => setNewPosition({ ...newPosition, currentPrice: e.target.value })}
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      <div className="modal-buttons">
                        <button type="button" onClick={() => setShowAddPosition(false)} className="secondary-btn">
                          Cancel
                        </button>
                        <button type="submit" className="primary-btn" disabled={loading}>
                          {loading ? 'Adding...' : 'Add Position'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="card empty-state">
              <h3>No Portfolio Selected</h3>
              <p>Select a portfolio from the list to view its details and positions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
