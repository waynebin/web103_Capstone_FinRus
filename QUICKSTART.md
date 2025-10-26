# Quick Start Guide

## For Development (Without Database)

If you want to quickly test the backtesting engine without setting up a database:

```bash
cd server
npm install
node demo.js
```

This will run a demonstration of the backtesting engine with sample data.

## For Full Application

### 1. Prerequisites
- Node.js v16+
- PostgreSQL 12+

### 2. Database Setup

Create the database:
```bash
createdb finrus
```

Run the schema:
```bash
psql -d finrus -f server/config/schema.sql
```

Or manually in psql:
```sql
CREATE DATABASE finrus;
\c finrus
\i server/config/schema.sql
```

### 3. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/finrus
NODE_ENV=development
```

Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

### 4. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Open your browser to `http://localhost:3000`

## Using the Application

### Backtesting

1. Click "Backtest" in the navigation
2. Select a strategy type:
   - **SMA**: Simple Moving Average crossover
   - **RSI**: Relative Strength Index
3. Configure parameters:
   - Stock symbol (e.g., AAPL, MSFT)
   - Date range
   - Initial capital
   - Strategy-specific parameters
4. Click "Run Backtest"
5. View results:
   - Performance metrics
   - Equity curve chart
   - Individual trade history

### Portfolio Monitoring

1. Click "Portfolio" in the navigation
2. Create a new portfolio:
   - Enter portfolio name
   - Set initial capital
3. Add positions:
   - Enter stock symbol
   - Quantity
   - Average purchase price
   - Current market price
4. View:
   - Total portfolio value
   - Unrealized P&L
   - Individual position performance

### Strategies

1. Click "Strategies" in the navigation
2. Create a new strategy:
   - Enter strategy name and description
   - Choose strategy type (SMA, RSI, MACD)
3. Use saved strategies for backtesting

## API Testing

You can test the API directly using curl or Postman:

### Run a Backtest
```bash
curl -X POST http://localhost:3001/api/backtest/run \
  -H "Content-Type: application/json" \
  -d '{
    "strategyType": "SMA",
    "strategyParams": {"shortPeriod": 20, "longPeriod": 50},
    "symbol": "AAPL",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "initialCapital": 10000
  }'
```

### Create a Portfolio
```bash
curl -X POST http://localhost:3001/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Portfolio",
    "initialCapital": 10000
  }'
```

### Get All Portfolios
```bash
curl http://localhost:3001/api/portfolio
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running: `pg_ctl status`
- Check your DATABASE_URL in `.env`
- Verify database exists: `psql -l | grep finrus`

### Port Already in Use
- Backend (3001): Change PORT in `.env`
- Frontend (3000): Change port in `client/vite.config.js`

### Module Not Found
- Run `npm install` in both server and client directories
- Check Node.js version: `node --version` (should be 16+)

## Next Steps

- Explore the code in `server/services/backtesting.js` to understand the backtesting engine
- Customize strategies by modifying or adding new strategy classes
- Add more performance metrics to the backtesting results
- Integrate real market data APIs (Alpha Vantage, Yahoo Finance, etc.)
- Add user authentication for multi-user support
