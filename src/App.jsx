import React from 'react';
import Dashboard from './components/Dashboard';
import { FinanceProvider } from './context/FinanceContext';

function App() {
  return (
    <FinanceProvider>
      <Dashboard />
    </FinanceProvider>
  );
}

export default App;
