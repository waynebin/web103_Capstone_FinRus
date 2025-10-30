# FinRus - Financial Backtesting & Monitoring Platform



CodePath WEB103 Final Project

Designed and developed by: **Duwayne Gray, Leo Shen, Parra Faith**

🔗 Link to deployed app: [Coming Soon]

## About

FinRus is a comprehensive financial application designed for easy backtesting of trading strategies and real-time portfolio monitoring. Built with React, Node.js, Express, and PostgreSQL, it provides traders and investors with powerful analytical tools to make informed financial decisions.

### Description and Purpose

FinRus empowers users to:
- **Test Trading Strategies**: Run backtests against historical data with multiple strategy types
- **Monitor Portfolios**: Track investments in real-time with detailed P&L calculations
- **Analyze Performance**: Get comprehensive metrics including Sharpe ratio, drawdown, and win rates
- **Manage Strategies**: Create, save, and reuse custom trading strategies

### Inspiration

The inspiration for FinRus came from the need for an accessible, comprehensive tool that combines backtesting and portfolio management in one platform. We wanted to democratize financial analysis tools that are typically only available to institutional investors.

## Tech Stack

**Frontend:**
- React 
- React Router 
- Recharts 
- Axios 
- Vite

**Backend:**
- Node.js with Express.js
- PostgreSQL for data persistence
- Custom backtesting engine

**Development Tools:**
- Git for version control
- npm for package management
- Hot reload for development

## Features

### 🚀 Advanced Backtesting Engine

**Complete trading strategy simulation with historical data analysis**

- **Multiple Strategy Support**: SMA (Simple Moving Average) crossovers and RSI (Relative Strength Index) strategies
- **Configurable Parameters**: Customize periods, thresholds, and capital amounts
- **Performance Metrics**: Calculate returns, Sharpe ratio, maximum drawdown, and win rates
- **Visual Analytics**: Interactive equity curves showing strategy performance over time
- **Trade History**: Detailed breakdown of individual trades with entry/exit points

### 💼 Portfolio Management System

**Real-time portfolio tracking and position management**

- **Multi-Portfolio Support**: Create and manage multiple investment portfolios
- **Position Tracking**: Monitor individual stock positions with real-time P&L calculations
- **Capital Management**: Track initial capital, current cash, and total portfolio value
- **Unrealized P&L**: Automatic calculation of gains/losses based on current market prices
- **Easy Position Management**: Add, update, and remove positions with intuitive interface

### Strategy Management

**Create, save, and organize trading strategies**

- **Strategy Library**: Save custom strategies for future backtests
- **Parameter Templates**: Pre-configured strategy setups for common approaches
- **Strategy History**: Track which strategies have been tested and their results
- **Easy Configuration**: User-friendly forms for strategy parameter input

### Data Visualization

**Rich charts and interactive displays**

- **Equity Curves**: Visual representation of portfolio performance over time
- **Performance Metrics Dashboard**: Clean display of key financial metrics
- **Trade Timeline**: Chronological view of all executed trades
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Robust Architecture

**Professional-grade code structure and error handling**

- **Modular Design**: Separated concerns with controllers, services, and models
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Data Validation**: Input validation on both frontend and backend
- **Fallback Data**: Demo mode with synthetic data when database unavailable

## Installation Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher) - Optional for full functionality
- npm or yarn package manager

### Quick Start (Demo Mode)
```bash
# Clone the repository
git clone https://github.com/waynebin/web103_Capstone_FinRus.git
cd web103_Capstone_FinRus

# Install server dependencies
cd server
npm install

# Run demo (no database required)
node demo.js

# Install client dependencies
cd ../client
npm install

# Start development servers
# Terminal 1 - Backend
cd server && npm start

# Terminal 2 - Frontend  
cd client && npm run dev
```

### Full Installation (With Database)

1. **Set up PostgreSQL Database**
   ```bash
   # Create database
   createdb finrus
   
   # Run schema
   psql -d finrus -f server/config/schema.sql
   ```

2. **Configure Environment**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Start the Application**
   ```bash
   # Start backend server
   cd server && npm start
   
   # Start frontend (new terminal)
   cd client && npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Usage Examples

**Run a Backtest:**
```javascript
// Example API call
POST /api/backtest/run
{
  "strategyType": "SMA",
  "strategyParams": { "shortPeriod": 20, "longPeriod": 50 },
  "symbol": "AAPL",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "initialCapital": 10000
}
```

**Create a Portfolio:**
```javascript
POST /api/portfolio
{
  "name": "My Investment Portfolio",
  "initialCapital": 25000
}
```