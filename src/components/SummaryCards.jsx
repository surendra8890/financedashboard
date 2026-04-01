import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  return (
    <div className="summary-grid anim-fade-in delay-2">
      <div className="glass-panel">
        <div className="card-header">
          <span className="card-title">Total Balance</span>
          <div className="card-icon icon-blue">
            <Wallet size={20} />
          </div>
        </div>
        <div className="card-amount">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div className="card-trend">
          <TrendingUp size={16} className="trend-up" />
          <span className="trend-up">+12.5%</span>
          <span className="trend-text">vs last month</span>
        </div>
      </div>

      <div className="glass-panel">
        <div className="card-header">
          <span className="card-title">Total Income</span>
          <div className="card-icon icon-green">
            <ArrowUpRight size={20} />
          </div>
        </div>
        <div className="card-amount">${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div className="card-trend">
          <TrendingUp size={16} className="trend-up" />
          <span className="trend-up">+8.2%</span>
          <span className="trend-text">vs last month</span>
        </div>
      </div>

      <div className="glass-panel">
        <div className="card-header">
          <span className="card-title">Total Expenses</span>
          <div className="card-icon icon-red">
            <ArrowDownRight size={20} />
          </div>
        </div>
        <div className="card-amount">${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div className="card-trend">
          <ArrowDownRight size={16} className="trend-down" />
          <span className="trend-down">-2.4%</span>
          <span className="trend-text">vs last month</span>
        </div>
      </div>
    </div>
  );
}
