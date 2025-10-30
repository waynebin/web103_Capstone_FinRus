# User Stories

## User Roles

### 1. **Retail Trader**
Individual investors who actively trade stocks and want to test strategies and monitor their portfolios. They have basic to intermediate knowledge of trading and financial metrics.

### 2. **Portfolio Manager**
Financial professionals managing investment portfolios for clients or institutions. They need comprehensive analytics, performance tracking, and strategy validation tools.

### 3. **Financial Student**
Students learning about finance, trading, and investment strategies. They need educational tools to understand how different strategies perform and learn about financial metrics.

---

## User Stories

### Backtesting & Strategy Testing

**Story 1:**
As a **retail trader**, I want to **test my SMA crossover strategy against historical data** so that I can **validate its performance before risking real money**.

**Story 2:**
As a **financial student**, I want to **compare different RSI thresholds (30/70 vs 20/80)** so that I can **understand how parameter changes affect strategy performance**.

**Story 3:**
As a **portfolio manager**, I want to **run backtests on multiple timeframes and symbols** so that I can **evaluate strategy robustness across different market conditions**.

**Story 4:**
As a **retail trader**, I want to **view detailed trade history with entry/exit points** so that I can **analyze individual trade decisions and improve my strategy**.

### Portfolio Management

**Story 5:**
As a **portfolio manager**, I want to **create multiple portfolios for different clients** so that I can **track each client's investments separately**.

**Story 6:**
As a **retail trader**, I want to **add my current stock positions with purchase prices** so that I can **monitor my unrealized gains and losses in real-time**.

**Story 7:**
As a **portfolio manager**, I want to **see total portfolio value and P&L calculations** so that I can **report performance to clients accurately**.

**Story 8:**
As a **retail trader**, I want to **update current market prices for my positions** so that I can **see accurate portfolio valuations**.

### Strategy Management & Analysis

**Story 9:**
As a **financial student**, I want to **save custom strategies with different parameters** so that I can **build a library of strategies to study and compare**.

**Story 10:**
As a **portfolio manager**, I want to **view comprehensive performance metrics (Sharpe ratio, max drawdown, win rate)** so that I can **make data-driven investment decisions**.

**Story 11:**
As a **retail trader**, I want to **visualize strategy performance with equity curves** so that I can **easily understand how my strategy would have performed over time**.

### User Experience & Interface

**Story 12:**
As a **financial student**, I want to **access a demo mode without database setup** so that I can **quickly explore the platform's features without technical barriers**.

**Story 13:**
As a **portfolio manager**, I want to **navigate between backtesting, portfolio, and strategy sections seamlessly** so that I can **efficiently manage all aspects of my investment analysis**.

**Story 14:**
As a **retail trader**, I want to **see clear error messages when something goes wrong** so that I can **understand what needs to be fixed and continue using the platform**.

---

## User Story Acceptance Criteria

### Example: Story 1 - SMA Strategy Backtesting
**Given** I am a retail trader on the backtesting page  
**When** I configure an SMA strategy with 20/50 periods for AAPL from 2023-01-01 to 2023-12-31  
**Then** I should see:
- Total return percentage
- Sharpe ratio calculation
- Maximum drawdown
- Win rate
- Individual trade details
- Equity curve visualization

### Example: Story 6 - Portfolio Position Tracking
**Given** I am a retail trader with an existing portfolio  
**When** I add a position for 100 shares of AAPL at $150 average price with $155 current price  
**Then** I should see:
- Position appears in my portfolio table
- Unrealized P&L shows +$500 (100 * ($155 - $150))
- Total portfolio value updates accordingly
- Position can be edited or deleted

---

## Future User Stories (Beyond Milestone 1)

### Advanced Features
- As a **portfolio manager**, I want to **export backtest results to PDF reports** so that I can **share analysis with clients**.
- As a **retail trader**, I want to **receive email alerts when my portfolio value changes significantly** so that I can **react quickly to market movements**.
- As a **financial student**, I want to **access educational tutorials about each strategy** so that I can **learn the theory behind the implementations**.

### Real-Time Data Integration
- As a **portfolio manager**, I want to **connect to live market data feeds** so that I can **get real-time portfolio valuations**.
- As a **retail trader**, I want to **automatically update historical data** so that I can **backtest with the most recent market information**.

### Social Features
- As a **financial student**, I want to **share my strategies with classmates** so that we can **learn from each other's approaches**.
- As a **retail trader**, I want to **see community strategy rankings** so that I can **discover popular and successful strategies**.