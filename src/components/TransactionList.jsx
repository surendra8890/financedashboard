import React, { useState, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import clsx from 'clsx';
import { ArrowUpRight, ArrowDownRight, Trash2, Plus, Search } from 'lucide-react';
import AddTransactionModal from './AddTransactionModal';

const getCategoryBadgeClass = (category) => {
  switch (category.toLowerCase()) {
    case 'food': return 'badge-food';
    case 'utilities': return 'badge-utilities';
    case 'entertainment': return 'badge-entertainment';
    case 'income': return 'badge-income';
    default: return 'badge-default';
  }
};

export default function TransactionList() {
  const { transactions, role, deleteTransaction } = useFinance();
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let result = [...transactions];

    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(lowerSearch) || 
        t.category.toLowerCase().includes(lowerSearch)
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc': return new Date(b.date) - new Date(a.date);
        case 'date-asc': return new Date(a.date) - new Date(b.date);
        case 'amount-desc': return Math.abs(b.amount) - Math.abs(a.amount);
        case 'amount-asc': return Math.abs(a.amount) - Math.abs(b.amount);
        default: return 0;
      }
    });

    return result;
  }, [transactions, filterType, searchTerm, sortBy]);

  return (
    <>
      <div className="glass-panel anim-fade-in delay-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 className="section-title" style={{ marginBottom: 0 }}>Transactions</h3>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ background: 'var(--bg-glass-5)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', padding: '0.4rem 0.6rem 0.4rem 2rem', fontSize: '0.85rem' }}
              />
            </div>

            <select 
              value={filterType} 
              onChange={e => setFilterType(e.target.value)}
              style={{ background: 'var(--bg-glass-5)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
            >
              <option value="all" style={{ background: 'var(--bg-color)' }}>All Types</option>
              <option value="income" style={{ background: 'var(--bg-color)' }}>Income</option>
              <option value="expense" style={{ background: 'var(--bg-color)' }}>Expense</option>
            </select>

            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)}
              style={{ background: 'var(--bg-glass-5)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
            >
              <option value="date-desc" style={{ background: 'var(--bg-color)' }}>Newest First</option>
              <option value="date-asc" style={{ background: 'var(--bg-color)' }}>Oldest First</option>
              <option value="amount-desc" style={{ background: 'var(--bg-color)' }}>Highest Amount</option>
              <option value="amount-asc" style={{ background: 'var(--bg-color)' }}>Lowest Amount</option>
            </select>

            {role === 'Admin' && (
              <button 
                onClick={() => setIsModalOpen(true)}
                style={{ background: 'var(--accent-blue)', color: 'var(--text-primary)', border: 'none', borderRadius: '8px', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500', transition: 'background 0.2s', boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)' }}
              >
                <Plus size={16} /> Add 
              </button>
            )}
          </div>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Category</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                {role === 'Admin' && <th style={{ width: '50px', textAlign: 'center' }}></th>}
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.length > 0 ? filteredAndSorted.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: tx.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: tx.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)'
                      }}>
                        {tx.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                      </div>
                      <div className="tx-desc">{tx.description}</div>
                    </div>
                  </td>
                  <td>
                    <span className={clsx('badge', getCategoryBadgeClass(tx.category))}>
                      {tx.category}
                    </span>
                  </td>
                  <td className="tx-date">{tx.date}</td>
                  <td style={{ textAlign: 'right' }} className={tx.type === 'income' ? 'amount-income' : 'amount-expense'}>
                    {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                  </td>
                  {role === 'Admin' && (
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s' }}
                        title="Delete Transaction"
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-red)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              )) : (
                <tr>
                  <td colSpan={role === 'Admin' ? 5 : 4} style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-secondary)' }}>
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
