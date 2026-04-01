import React from 'react';
import { Bell, Search, User, Shield, Sun, Moon } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export default function Header() {
  const { role, setRole, theme, setTheme } = useFinance();

  return (
    <div className="header anim-fade-in delay-1">
      <div>
        <h1>Dashboard</h1>
        <p>Welcome back. Here's your financial overview.</p>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-glass-5)', borderRadius: '20px', padding: '0.35rem 0.75rem', border: '1px solid var(--border-color)', transition: 'background 0.2s', cursor: 'pointer' }} title="Switch Role (RBAC Demo)">
          <Shield size={16} style={{ color: role === 'Admin' ? 'var(--accent-blue)' : 'var(--text-secondary)', marginRight: '0.5rem' }} />
          <select 
            value={role} 
            onChange={e => setRole(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', cursor: 'pointer', fontWeight: '500' }}
          >
            <option value="Viewer" style={{ background: 'var(--bg-color)' }}>Viewer</option>
            <option value="Admin" style={{ background: 'var(--bg-color)' }}>Admin Mode</option>
          </select>
        </div>

        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s', padding: '0.5rem' }}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s', padding: '0.5rem' }}>
          <Search size={22} />
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s', padding: '0.5rem' }}>
          <Bell size={22} />
        </button>
        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', cursor: 'pointer' }}>
          <User size={20} color="#ffffff" />
        </div>
      </div>
    </div>
  );
}
