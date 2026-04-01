import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Lightbulb, Target, Activity, Wallet } from 'lucide-react';

export default function Insights() {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    if (transactions.length === 0) return null;

    // 1. Highest spending category
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
      return acc;
    }, {});
    
    let highestCat = 'N/A';
    let highestVal = 0;
    Object.entries(categoryTotals).forEach(([cat, val]) => {
      if (val > highestVal) {
        highestVal = val;
        highestCat = cat;
      }
    });

    // 2. Average transaction size
    const avgTransaction = expenses.length > 0 
      ? expenses.reduce((acc, curr) => acc + Math.abs(curr.amount), 0) / expenses.length 
      : 0;

    return {
      highestCategory: highestCat,
      highestCategoryAmount: highestVal,
      avgExpense: avgTransaction,
      monthlyTransactionsCount: transactions.length
    };
  }, [transactions]);

  if (!insights) return null;

  return (
    <div className="glass-panel anim-fade-in delay-2" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
      <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <Lightbulb size={20} color="var(--accent-purple)" />
        Financial Insights
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: 'var(--bg-glass-2)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ padding: '0.6rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '10px', color: 'var(--accent-red)' }}>
            <Target size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Highest Spending Category</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--text-primary)' }}>{insights.highestCategory} <span style={{ fontSize: '0.85rem', fontWeight: '400', color: 'var(--text-secondary)' }}>(${insights.highestCategoryAmount.toFixed(2)})</span></div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: 'var(--bg-glass-2)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ padding: '0.6rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px', color: 'var(--accent-blue)' }}>
            <Activity size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Average Expense Size</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--text-primary)' }}>${insights.avgExpense.toFixed(2)}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: 'var(--bg-glass-2)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ padding: '0.6rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', color: 'var(--accent-green)' }}>
            <Wallet size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Total Tracked Activity</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--text-primary)' }}>{insights.monthlyTransactionsCount} transactions</div>
          </div>
        </div>

      </div>
    </div>
  );
}
