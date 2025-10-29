import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Backtest from './pages/Backtest';
import Portfolio from './pages/Portfolio';
import Strategies from './pages/Strategies';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              <img src="src/assets/Shark Fin and Market Surge Logo.png" alt="FinRus Logo" className="nav-logo-img" />
              FinRus
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/backtest" className="nav-link">Backtest</Link>
              </li>
              <li className="nav-item">
                <Link to="/portfolio" className="nav-link">Portfolio</Link>
              </li>
              <li className="nav-item">
                <Link to="/strategies" className="nav-link">Strategies</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/backtest" element={<Backtest />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/strategies" element={<Strategies />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
