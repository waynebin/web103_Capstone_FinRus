# FinRus - Financial Backtesting & Monitoring Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

FinRus is a comprehensive financial application designed for easy backtesting of trading strategies and real-time portfolio monitoring. Built with React, Node.js, Express, and PostgreSQL.

## 🚀 Features

### Backtesting Engine
- **Multiple Trading Strategies**: Support for SMA (Simple Moving Average), RSI (Relative Strength Index), and more
- **Historical Data Analysis**: Test strategies against historical market data
- **Performance Metrics**: Calculate returns, Sharpe ratio, maximum drawdown, and win rates
- **Visual Analytics**: Interactive equity curves and trade history visualization

### Portfolio Monitoring
- **Real-time Tracking**: Monitor your investment portfolio in real-time
- **Position Management**: Track individual positions with entry prices and current values
- **P&L Calculation**: Automatic calculation of unrealized profits and losses
- **Multiple Portfolios**: Create and manage multiple portfolios

### Strategy Management
- **Custom Strategies**: Create and save custom trading strategies
- **Strategy Library**: Access pre-built strategy templates
- **Parameter Customization**: Fine-tune strategy parameters for optimal performance

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/waynebin/web103_Capstone_FinRus.git
cd web103_Capstone_FinRus
```

### 2. Set up the database

Create a PostgreSQL database:
```bash
createdb finrus
```

Run the database schema:
```bash
psql -d finrus -f server/config/schema.sql
```

### 3. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` with your database credentials:
```
PORT=3001
DATABASE_URL=postgresql://localhost:5432/finrus
NODE_ENV=development
```

### 4. Set up the frontend

```bash
cd ../client
npm install
```

## 🏃‍♂️ Running the Application

### Start the backend server
```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

The server will start on `http://localhost:3001`

### Start the frontend
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:3000`

## 📖 API Documentation

### Backtest Endpoints

#### Run Backtest
```
POST /api/backtest/run
Content-Type: application/json

{
  "strategyType": "SMA",
  "strategyParams": {
    "shortPeriod": 20,
    "longPeriod": 50
  },
  "symbol": "AAPL",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "initialCapital": 10000
}
```

#### Get Backtest Results
```
GET /api/backtest/results?limit=50&offset=0
```

#### Get Specific Backtest
```
GET /api/backtest/results/:id
```

### Portfolio Endpoints

#### Get All Portfolios
```
GET /api/portfolio
```

#### Create Portfolio
```
POST /api/portfolio
Content-Type: application/json

{
  "name": "My Portfolio",
  "initialCapital": 10000
}
```

#### Add Position
```
POST /api/portfolio/:id/positions
Content-Type: application/json

{
  "symbol": "AAPL",
  "quantity": 100,
  "averagePrice": 150.00,
  "currentPrice": 155.00
}
```

### Strategies Endpoints

#### Get All Strategies
```
GET /api/strategies
```

#### Create Strategy
```
POST /api/strategies
Content-Type: application/json

{
  "name": "My SMA Strategy",
  "description": "20/50 SMA crossover",
  "type": "SMA",
  "parameters": {
    "shortPeriod": 20,
    "longPeriod": 50
  }
}
```

## 🧪 Testing

### Running Backtests

1. Navigate to the Backtest page
2. Select a strategy type (SMA or RSI)
3. Configure parameters:
   - Stock symbol
   - Date range
   - Initial capital
   - Strategy-specific parameters
4. Click "Run Backtest"
5. View results including:
   - Performance metrics
   - Equity curve
   - Trade history

### Managing Portfolios

1. Navigate to the Portfolio page
2. Create a new portfolio with initial capital
3. Add positions with:
   - Stock symbol
   - Quantity
   - Average entry price
   - Current market price
4. Monitor unrealized P&L and total portfolio value

## 🏗️ Project Structure

```
web103_Capstone_FinRus/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── config/            # Configuration files
│   │   ├── database.js    # Database connection
│   │   └── schema.sql     # Database schema
│   ├── controllers/       # Request handlers
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   │   └── backtesting.js # Backtesting engine
│   ├── server.js          # Entry point
│   └── package.json
└── README.md
```

## 🔧 Technology Stack

### Frontend
- React 18
- React Router v6
- Recharts (Data visualization)
- Axios (HTTP client)
- Vite (Build tool)

### Backend
- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)

## 📊 Supported Trading Strategies

### Simple Moving Average (SMA)
Generates buy/sell signals based on the crossover of short-term and long-term moving averages.

**Parameters:**
- Short Period (default: 20 days)
- Long Period (default: 50 days)

### Relative Strength Index (RSI)
Identifies overbought and oversold conditions.

**Parameters:**
- Period (default: 14 days)
- Oversold threshold (default: 30)
- Overbought threshold (default: 70)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Wayne Bin - Initial work

## 🙏 Acknowledgments

- Web 103 Capstone Project
- Financial data analysis community
- Open-source contributors

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Note**: This application is for educational purposes only. Always conduct thorough research and consult with financial professionals before making investment decisions.
