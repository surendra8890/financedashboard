import React, { createContext, useContext, useState, useEffect } from 'react';
import { transactions as initialmockTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialmockTransactions;
      }
    }
    return initialmockTransactions;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('finance_role') || 'Viewer';
  });

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('finance_theme');
    if (savedTheme) return savedTheme;
    // Auto-detect system theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('finance_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [{...transaction, id: Date.now()}, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };
  
  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  return (
    <FinanceContext.Provider value={{
      transactions,
      role,
      setRole,
      theme,
      setTheme,
      addTransaction,
      deleteTransaction,
      totalBalance,
      totalIncome,
      totalExpenses
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
