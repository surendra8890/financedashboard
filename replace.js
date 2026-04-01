import fs from 'fs';

const files = ['TransactionList.jsx', 'Insights.jsx', 'Header.jsx', 'Dashboard.jsx', 'Charts.jsx', 'AddTransactionModal.jsx'];

files.forEach(f => {
  let p = 'src/components/' + f;
  let c = fs.readFileSync(p, 'utf8');
  // Dynamic UI color replacements
  c = c.replace(/'#fff'/g, "'var(--text-primary)'");
  c = c.replace(/"#fff"/g, '"var(--text-primary)"');
  c = c.replace(/'rgba\(255,255,255,0\.05\)'/g, "'var(--bg-glass-5)'");
  c = c.replace(/'rgba\(255,255,255,0\.02\)'/g, "'var(--bg-glass-2)'");
  c = c.replace(/'rgba\(255,255,255,0\.1\)'/g, "'var(--bg-glass-10)'");
  // Change background of charts border stroke
  c = c.replace(/'rgba\(255,255,255,0\.1\)'/g, "'var(--bg-glass-10)'");
  c = c.replace(/colorScheme: 'dark'/g, "colorScheme: 'var(--color-scheme)'");
  fs.writeFileSync(p, c);
});
console.log('JSX files successfully patched for theme variables.');
