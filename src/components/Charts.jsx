import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useFinance } from '../context/FinanceContext';

const COLORS = ['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel" style={{ padding: '0.75rem 1rem', borderRadius: '12px', minWidth: '120px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{label}</p>
        <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function Charts() {
  const { transactions } = useFinance();

  // Compute accumulated balance over time
  const balanceTrendData = useMemo(() => {
    // Sort transactions earliest to latest
    const sorted = [...transactions].sort((a,b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    const dataObj = {};

    sorted.forEach(t => {
      runningBalance += t.amount;
      const dateStr = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
      dataObj[dateStr] = runningBalance;
    });

    return Object.entries(dataObj).map(([date, balance]) => ({ date, balance }));
  }, [transactions]);

  // Compute expense categories
  const expensesByCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
      return acc;
    }, {});
    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a,b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="charts-grid anim-fade-in delay-3">
      <div className="glass-panel">
        <h3 className="section-title">Balance Trend</h3>
        <div className="chart-container">
          {balanceTrendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--bg-glass-10)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="balance" stroke="var(--accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" activeDot={{ r: 6, fill: 'var(--accent-blue)', stroke: 'var(--text-primary)', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
             <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>No sufficient data</div>
          )}
        </div>
      </div>

      <div className="glass-panel">
        <h3 className="section-title">Spending</h3>
        <div className="chart-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {expensesByCategory.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ width: '100%', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '120px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {expensesByCategory.map((entry, index) => (
                  <div key={entry.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length], flexShrink: 0 }}></div>
                      <span style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entry.name}</span>
                    </div>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '500', marginLeft: '0.5rem' }}>${entry.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>No expense data</div>
          )}
        </div>
      </div>
    </div>
  );
}
