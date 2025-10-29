import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to FinRus</h1>
        <img src="src/assets/Shark Fin and Market Surge Logo.png" alt="FinRus Logo" className="hero-logo" />
        <p className="hero-subtitle">
          
          Your comprehensive financial backtesting and portfolio monitoring platform.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Backtesting</h3>
          <p>
            Test your trading strategies against historical data. Analyze performance
            metrics including returns, Sharpe ratio, and maximum drawdown.
          </p>
          <Link to="/backtest" className="feature-link">
            Start Backtesting →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💼</div>
          <h3>Portfolio Monitoring</h3>
          <p>
            Track your investments in real-time. Monitor positions, calculate
            unrealized P&L, and analyze portfolio performance.
          </p>
          <Link to="/portfolio" className="feature-link">
            View Portfolio →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Trading Strategies</h3>
          <p>
            Create and manage custom trading strategies. Choose from SMA crossovers,
            RSI indicators, MACD, and more.
          </p>
          <Link to="/strategies" className="feature-link">
            Explore Strategies →
          </Link>
        </div>
      </div>

      <div className="info-section">
        <h2>Key Features</h2>
        <ul className="features-list">
          <li>✅ Multiple trading strategy support (SMA, RSI, MACD)</li>
          <li>✅ Comprehensive performance metrics</li>
          <li>✅ Real-time portfolio tracking</li>
          <li>✅ Historical data analysis</li>
          <li>✅ Visual charts and graphs</li>
          <li>✅ Easy-to-use interface</li>
        </ul>
      </div>

      <div className="cta-section">
        <h2>Ready to get started?</h2>
        <p>Run your first backtest or create a portfolio to begin monitoring your investments.</p>
        <div className="cta-buttons">
          <Link to="/backtest">
            <button className="primary-btn">Run Backtest</button>
          </Link>
          <Link to="/portfolio">
            <button className="secondary-btn">Create Portfolio</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
