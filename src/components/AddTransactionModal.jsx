import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X } from 'lucide-react';

export default function AddTransactionModal({ isOpen, onClose }) {
  const { addTransaction } = useFinance();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    type: 'expense'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    addTransaction({
      ...formData,
      amount: formData.type === 'expense' ? -Math.abs(Number(formData.amount)) : Math.abs(Number(formData.amount))
    });
    
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    });
    onClose();
  };

  return (
    <div className="anim-fade-in" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="glass-panel" style={{ width: '90%', maxWidth: '400px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem' }}>
          <X size={20} />
        </button>
        <h3 className="section-title" style={{ marginBottom: '1.5rem' }}>Add Transaction</h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Type</label>
            <select 
              value={formData.type} 
              onChange={e => setFormData({...formData, type: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-glass-5)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
            >
              <option value="expense" style={{ background: 'var(--bg-color)' }}>Expense</option>
              <option value="income" style={{ background: 'var(--bg-color)' }}>Income</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Description</label>
            <input 
              type="text" 
              required
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="e.g. Grocery Store"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-glass-5)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Amount</label>
            <input 
              type="number" 
              required
              step="0.01"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              placeholder="0.00"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-glass-5)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Category</label>
            <select 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-glass-5)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
            >
              {formData.type === 'expense' ? (
                <>
                  <option value="Food" style={{ background: 'var(--bg-color)' }}>Food</option>
                  <option value="Utilities" style={{ background: 'var(--bg-color)' }}>Utilities</option>
                  <option value="Entertainment" style={{ background: 'var(--bg-color)' }}>Entertainment</option>
                  <option value="Transport" style={{ background: 'var(--bg-color)' }}>Transport</option>
                  <option value="Misc" style={{ background: 'var(--bg-color)' }}>Misc</option>
                </>
              ) : (
                <>
                  <option value="Income" style={{ background: 'var(--bg-color)' }}>Income</option>
                  <option value="Gift" style={{ background: 'var(--bg-color)' }}>Gift</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Date</label>
            <input 
              type="date" 
              required
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-glass-5)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.95rem', colorScheme: 'var(--color-scheme)' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--accent-blue)', color: 'var(--text-primary)', border: 'none', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem', transition: 'background 0.2s' }}>
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
