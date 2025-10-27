/**
 * Backtesting Engine for FinRus
 * Supports various trading strategies on historical data
 */

class BacktestingEngine {
  constructor(strategy, historicalData, initialCapital = 10000) {
    this.strategy = strategy;
    this.historicalData = historicalData;
    this.initialCapital = initialCapital;
    this.currentCapital = initialCapital;
    this.position = null; // Current position { quantity, entryPrice, entryDate }
    this.trades = [];
    this.equity = [initialCapital];
  }

  /**
   * Run the backtest
   */
  run() {
    for (let i = 0; i < this.historicalData.length; i++) {
      const currentBar = this.historicalData[i];
      const signal = this.strategy.generateSignal(this.historicalData, i);

      if (signal === 'BUY' && !this.position) {
        this.executeBuy(currentBar);
      } else if (signal === 'SELL' && this.position) {
        this.executeSell(currentBar);
      }

      // Update equity curve
      const currentEquity = this.calculateCurrentEquity(currentBar);
      this.equity.push(currentEquity);
    }

    // Close any open positions at the end
    if (this.position) {
      const lastBar = this.historicalData[this.historicalData.length - 1];
      this.executeSell(lastBar);
    }

    return this.calculateResults();
  }

  /**
   * Execute a buy order
   */
  executeBuy(bar) {
    const quantity = Math.floor(this.currentCapital / bar.close);
    if (quantity > 0) {
      this.position = {
        quantity,
        entryPrice: bar.close,
        entryDate: bar.date
      };
      this.currentCapital -= quantity * bar.close;
    }
  }

  /**
   * Execute a sell order
   */
  executeSell(bar) {
    if (!this.position) return;

    const proceeds = this.position.quantity * bar.close;
    const profit = proceeds - (this.position.quantity * this.position.entryPrice);
    const returnPct = (profit / (this.position.quantity * this.position.entryPrice)) * 100;

    this.trades.push({
      type: 'SELL',
      entryDate: this.position.entryDate,
      exitDate: bar.date,
      entryPrice: this.position.entryPrice,
      exitPrice: bar.close,
      quantity: this.position.quantity,
      profit,
      returnPct
    });

    this.currentCapital += proceeds;
    this.position = null;
  }

  /**
   * Calculate current equity (cash + position value)
   */
  calculateCurrentEquity(bar) {
    let equity = this.currentCapital;
    if (this.position) {
      equity += this.position.quantity * bar.close;
    }
    return equity;
  }

  /**
   * Calculate backtest results and metrics
   */
  calculateResults() {
    const finalCapital = this.currentCapital;
    const totalReturn = ((finalCapital - this.initialCapital) / this.initialCapital) * 100;
    
    // Calculate Sharpe Ratio
    const returns = [];
    for (let i = 1; i < this.equity.length; i++) {
      returns.push((this.equity[i] - this.equity[i - 1]) / this.equity[i - 1]);
    }
    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const stdDev = Math.sqrt(
      returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length
    );
    const sharpeRatio = stdDev !== 0 ? (avgReturn / stdDev) * Math.sqrt(252) : 0;

    // Calculate Maximum Drawdown
    let maxDrawdown = 0;
    let peak = this.equity[0];
    for (const value of this.equity) {
      if (value > peak) peak = value;
      const drawdown = ((peak - value) / peak) * 100;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    }

    // Calculate Win Rate
    const winningTrades = this.trades.filter(t => t.profit > 0).length;
    const winRate = this.trades.length > 0 ? (winningTrades / this.trades.length) * 100 : 0;

    return {
      initialCapital: this.initialCapital,
      finalCapital,
      totalReturn,
      sharpeRatio,
      maxDrawdown,
      winRate,
      totalTrades: this.trades.length,
      trades: this.trades,
      equity: this.equity
    };
  }
}

/**
 * Simple Moving Average (SMA) Strategy
 */
export class SMAStrategy {
  constructor(shortPeriod = 20, longPeriod = 50) {
    this.shortPeriod = shortPeriod;
    this.longPeriod = longPeriod;
  }

  calculateSMA(data, period, index) {
    if (index < period - 1) return null;
    let sum = 0;
    for (let i = index - period + 1; i <= index; i++) {
      sum += data[i].close;
    }
    return sum / period;
  }

  generateSignal(data, index) {
    if (index < this.longPeriod) return 'HOLD';

    const shortSMA = this.calculateSMA(data, this.shortPeriod, index);
    const longSMA = this.calculateSMA(data, this.longPeriod, index);
    const prevShortSMA = this.calculateSMA(data, this.shortPeriod, index - 1);
    const prevLongSMA = this.calculateSMA(data, this.longPeriod, index - 1);

    // Golden cross - buy signal
    if (prevShortSMA <= prevLongSMA && shortSMA > longSMA) {
      return 'BUY';
    }
    // Death cross - sell signal
    if (prevShortSMA >= prevLongSMA && shortSMA < longSMA) {
      return 'SELL';
    }

    return 'HOLD';
  }
}

/**
 * RSI (Relative Strength Index) Strategy
 */
export class RSIStrategy {
  constructor(period = 14, oversold = 30, overbought = 70) {
    this.period = period;
    this.oversold = oversold;
    this.overbought = overbought;
  }

  calculateRSI(data, index) {
    if (index < this.period) return null;

    let gains = 0;
    let losses = 0;

    for (let i = index - this.period + 1; i <= index; i++) {
      const change = data[i].close - data[i - 1].close;
      if (change > 0) gains += change;
      else losses += Math.abs(change);
    }

    const avgGain = gains / this.period;
    const avgLoss = losses / this.period;

    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  generateSignal(data, index) {
    const rsi = this.calculateRSI(data, index);
    if (rsi === null) return 'HOLD';

    if (rsi < this.oversold) return 'BUY';
    if (rsi > this.overbought) return 'SELL';
    return 'HOLD';
  }
}

export default BacktestingEngine;
