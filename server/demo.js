#!/usr/bin/env node

/**
 * Demo script to showcase the backtesting engine
 * Run: node demo.js
 */

import BacktestingEngine, { SMAStrategy, RSIStrategy } from './services/backtesting.js';

// Generate sample historical data
function generateSampleData(days = 250) {
  const data = [];
  let currentPrice = 100;
  const startDate = new Date('2023-01-01');

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Random walk with slight upward bias
    const change = (Math.random() - 0.48) * 2;
    currentPrice = Math.max(currentPrice + change, 10);

    const open = currentPrice;
    const high = currentPrice + Math.random() * 2;
    const low = currentPrice - Math.random() * 2;
    const close = low + Math.random() * (high - low);

    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000)
    });
  }

  return data;
}

console.log('╔═══════════════════════════════════════════════════╗');
console.log('║     FinRus Backtesting Engine Demo               ║');
console.log('╚═══════════════════════════════════════════════════╝\n');

// Test 1: SMA Strategy
console.log('📊 Testing SMA Strategy (20/50 crossover)...\n');

const smaStrategy = new SMAStrategy(20, 50);
const historicalData = generateSampleData(250);
const smaEngine = new BacktestingEngine(smaStrategy, historicalData, 10000);
const smaResults = smaEngine.run();

console.log('Results:');
console.log(`  Initial Capital: $${smaResults.initialCapital.toFixed(2)}`);
console.log(`  Final Capital:   $${smaResults.finalCapital.toFixed(2)}`);
console.log(`  Total Return:    ${smaResults.totalReturn.toFixed(2)}%`);
console.log(`  Sharpe Ratio:    ${smaResults.sharpeRatio.toFixed(4)}`);
console.log(`  Max Drawdown:    ${smaResults.maxDrawdown.toFixed(2)}%`);
console.log(`  Win Rate:        ${smaResults.winRate.toFixed(2)}%`);
console.log(`  Total Trades:    ${smaResults.totalTrades}`);
console.log('');

// Test 2: RSI Strategy
console.log('📊 Testing RSI Strategy (14-period, 30/70)...\n');

const rsiStrategy = new RSIStrategy(14, 30, 70);
const rsiEngine = new BacktestingEngine(rsiStrategy, historicalData, 10000);
const rsiResults = rsiEngine.run();

console.log('Results:');
console.log(`  Initial Capital: $${rsiResults.initialCapital.toFixed(2)}`);
console.log(`  Final Capital:   $${rsiResults.finalCapital.toFixed(2)}`);
console.log(`  Total Return:    ${rsiResults.totalReturn.toFixed(2)}%`);
console.log(`  Sharpe Ratio:    ${rsiResults.sharpeRatio.toFixed(4)}`);
console.log(`  Max Drawdown:    ${rsiResults.maxDrawdown.toFixed(2)}%`);
console.log(`  Win Rate:        ${rsiResults.winRate.toFixed(2)}%`);
console.log(`  Total Trades:    ${rsiResults.totalTrades}`);
console.log('');

// Show some trade examples
if (smaResults.trades.length > 0) {
  console.log('📈 Sample Trades (SMA Strategy):');
  smaResults.trades.slice(0, 3).forEach((trade, index) => {
    console.log(`  Trade ${index + 1}:`);
    console.log(`    Entry: ${trade.entryDate} @ $${trade.entryPrice.toFixed(2)}`);
    console.log(`    Exit:  ${trade.exitDate} @ $${trade.exitPrice.toFixed(2)}`);
    console.log(`    P/L:   $${trade.profit.toFixed(2)} (${trade.returnPct.toFixed(2)}%)`);
  });
}

console.log('\n✅ Demo completed successfully!\n');
console.log('To run the full application:');
console.log('  1. Set up PostgreSQL database (see README.md)');
console.log('  2. Run server: cd server && npm start');
console.log('  3. Run client: cd client && npm run dev');
console.log('  4. Open http://localhost:3000\n');
