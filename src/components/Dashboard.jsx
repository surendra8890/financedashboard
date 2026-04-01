import React from 'react';
import Header from './Header';
import SummaryCards from './SummaryCards';
import Insights from './Insights';
import Charts from './Charts';
import TransactionList from './TransactionList';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Header />
      <SummaryCards />
      <Insights />
      <span style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '-0.5rem', letterSpacing: '-0.02em' }}>Visual Trends</span>
      <Charts />
      <TransactionList />
    </div>
  );
}
