import React, { useState, useEffect } from 'react';
import { strategiesAPI } from '../services/api';
import './Strategies.css';

function Strategies() {
  const [strategies, setStrategies] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newStrategy, setNewStrategy] = useState({
    name: '',
    description: '',
    type: 'SMA',
    parameters: {}
  });

  useEffect(() => {
    loadStrategies();
  }, []);

  const loadStrategies = async () => {
    try {
      const data = await strategiesAPI.getAll();
      setStrategies(data.strategies || []);
    } catch (err) {
      console.error('Error loading strategies:', err);
    }
  };

  const handleCreateStrategy = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await strategiesAPI.create(newStrategy);
      setShowCreateForm(false);
      setNewStrategy({
        name: '',
        description: '',
        type: 'SMA',
        parameters: {}
      });
      await loadStrategies();
    } catch (err) {
      console.error('Error creating strategy:', err);
      alert('Failed to create strategy');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStrategy = async (id) => {
    if (!window.confirm('Are you sure you want to delete this strategy?')) {
      return;
    }

    try {
      await strategiesAPI.delete(id);
      await loadStrategies();
    } catch (err) {
      console.error('Error deleting strategy:', err);
      alert('Failed to delete strategy');
    }
  };

  const strategyTypes = [
    { value: 'SMA', label: 'Simple Moving Average', description: 'Uses crossover of short and long moving averages' },
    { value: 'RSI', label: 'Relative Strength Index', description: 'Uses overbought/oversold signals' },
    { value: 'MACD', label: 'MACD', description: 'Moving Average Convergence Divergence' }
  ];

  return (
    <div className="strategies-container">
      <div className="strategies-header">
        <div>
          <h1>Trading Strategies</h1>
          <p className="subtitle">Create and manage your trading strategies</p>
        </div>
        <button 
          className="primary-btn" 
          onClick={() => setShowCreateForm(true)}
        >
          + Create Strategy
        </button>
      </div>

      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Strategy</h2>
            <form onSubmit={handleCreateStrategy}>
              <div className="form-group">
                <label>Strategy Name</label>
                <input
                  type="text"
                  value={newStrategy.name}
                  onChange={(e) => setNewStrategy({ ...newStrategy, name: e.target.value })}
                  placeholder="e.g., My SMA Strategy"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newStrategy.description}
                  onChange={(e) => setNewStrategy({ ...newStrategy, description: e.target.value })}
                  placeholder="Describe your strategy..."
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Strategy Type</label>
                <select
                  value={newStrategy.type}
                  onChange={(e) => setNewStrategy({ ...newStrategy, type: e.target.value })}
                >
                  {strategyTypes.map(st => (
                    <option key={st.value} value={st.value}>{st.label}</option>
                  ))}
                </select>
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

      <div className="strategies-grid">
        {strategies.length === 0 ? (
          <div className="card empty-state">
            <h3>No Strategies Yet</h3>
            <p>Create your first trading strategy to get started!</p>
          </div>
        ) : (
          strategies.map((strategy) => (
            <div key={strategy.id} className="strategy-card">
              <div className="strategy-header">
                <div>
                  <h3>{strategy.name}</h3>
                  <span className="strategy-type-badge">{strategy.type}</span>
                </div>
              </div>
              <p className="strategy-description">
                {strategy.description || 'No description provided'}
              </p>
              <div className="strategy-footer">
                <div className="strategy-date">
                  Created: {new Date(strategy.created_at).toLocaleDateString()}
                </div>
                <button 
                  className="danger-btn small-btn"
                  onClick={() => handleDeleteStrategy(strategy.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="card strategy-info">
        <h2>Available Strategy Types</h2>
        <div className="strategy-types-grid">
          {strategyTypes.map(st => (
            <div key={st.value} className="strategy-type-info">
              <h4>{st.label}</h4>
              <p>{st.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Strategies;
