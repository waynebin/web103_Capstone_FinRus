-- Create database schema for FinRus (Converted for Oracle SQL)

-- Note: In Oracle, auto-incrementing IDs are typically handled by Sequences and Triggers,
-- or by using IDENTITY columns (in Oracle 12c+). This DDL uses standard NUMBER.

-- Strategies table
CREATE TABLE strategies (
    id NUMBER(10) PRIMARY KEY, -- Use a Sequence and Trigger for auto-increment in application
    name VARCHAR2(255) NOT NULL,
    description CLOB, -- Converted from TEXT
    type VARCHAR2(50) NOT NULL, -- e.g., 'moving_average', 'rsi', 'macd'
    parameters CLOB, -- Converted from JSONB to CLOB for flexible JSON storage
    created_at TIMESTAMP DEFAULT SYSTIMESTAMP,
    updated_at TIMESTAMP DEFAULT SYSTIMESTAMP
);

-- Backtest results table
CREATE TABLE backtest_results (
    id NUMBER(10) PRIMARY KEY, -- Use a Sequence and Trigger for auto-increment
    strategy_id NUMBER(10) REFERENCES strategies(id),
    symbol VARCHAR2(10) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    initial_capital NUMBER(15, 2) NOT NULL,
    final_capital NUMBER(15, 2) NOT NULL,
    total_return NUMBER(10, 4),
    sharpe_ratio NUMBER(10, 4),
    max_drawdown NUMBER(10, 4),
    win_rate NUMBER(5, 2),
    total_trades NUMBER(10),
    trades CLOB, -- Converted from JSONB to CLOB
    created_at TIMESTAMP DEFAULT SYSTIMESTAMP
);

-- Portfolio table
CREATE TABLE portfolios (
    id NUMBER(10) PRIMARY KEY, -- Use a Sequence and Trigger for auto-increment
    name VARCHAR2(255) NOT NULL,
    initial_capital NUMBER(15, 2) NOT NULL,
    current_capital NUMBER(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT SYSTIMESTAMP,
    updated_at TIMESTAMP DEFAULT SYSTIMESTAMP
);

-- Portfolio positions table
CREATE TABLE portfolio_positions (
    id NUMBER(10) PRIMARY KEY, -- Use a Sequence and Trigger for auto-increment
    portfolio_id NUMBER(10) REFERENCES portfolios(id),
    symbol VARCHAR2(10) NOT NULL,
    quantity NUMBER(10) NOT NULL,
    average_price NUMBER(10, 4) NOT NULL,
    current_price NUMBER(10, 4),
    unrealized_pnl NUMBER(15, 2),
    created_at TIMESTAMP DEFAULT SYSTIMESTAMP,
    updated_at TIMESTAMP DEFAULT SYSTAMPTIME
);

-- Historical prices table (for backtesting)
CREATE TABLE historical_prices (
    id NUMBER(10) PRIMARY KEY, -- Use a Sequence and Trigger for auto-increment
    symbol VARCHAR2(10) NOT NULL,
    date DATE NOT NULL,
    open NUMBER(10, 4) NOT NULL,
    high NUMBER(10, 4) NOT NULL,
    low NUMBER(10, 4) NOT NULL,
    close NUMBER(10, 4) NOT NULL,
    volume NUMBER(20),
    CONSTRAINT uk_historical_prices UNIQUE (symbol, date)
);

-- Create indexes for better query performance (No IF NOT EXISTS syntax in standard Oracle)
CREATE INDEX idx_strategies_type ON strategies(type);
CREATE INDEX idx_backtest_results_strategy_id ON backtest_results(strategy_id);
CREATE INDEX idx_backtest_results_symbol ON backtest_results(symbol);
CREATE INDEX idx_portfolio_positions_portfolio_id ON portfolio_positions(portfolio_id);
CREATE INDEX idx_portfolio_positions_symbol ON portfolio_positions(symbol);
CREATE INDEX idx_historical_prices_symbol_date ON historical_prices(symbol, date);

