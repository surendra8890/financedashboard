export const transactions = [
  { id: 1, date: "2026-04-01", description: "Grocery Store", category: "Food", amount: -150.20, type: "expense" },
  { id: 2, date: "2026-03-28", description: "Netflix Subscription", category: "Entertainment", amount: -15.99, type: "expense" },
  { id: 3, date: "2026-03-25", description: "Salary", category: "Income", amount: 4500.00, type: "income" },
  { id: 4, date: "2026-03-24", description: "Coffee Shop", category: "Food", amount: -5.50, type: "expense" },
  { id: 5, date: "2026-03-22", description: "Electricity Bill", category: "Utilities", amount: -85.00, type: "expense" },
  { id: 6, date: "2026-03-20", description: "Freelance Project", category: "Income", amount: 1200.00, type: "income" },
  { id: 7, date: "2026-03-18", description: "Internet", category: "Utilities", amount: -60.00, type: "expense" },
  { id: 8, date: "2026-03-15", description: "Restaurant", category: "Food", amount: -45.00, type: "expense" },
];

export const summaryData = {
  totalBalance: 5338.31,
  totalIncome: 5700.00,
  totalExpenses: 361.69,
};

export const balanceTrendData = [
  { date: "Mar 15", balance: 1200 },
  { date: "Mar 18", balance: 1140 },
  { date: "Mar 20", balance: 2340 },
  { date: "Mar 22", balance: 2255 },
  { date: "Mar 24", balance: 2249.5 },
  { date: "Mar 25", balance: 6749.5 },
  { date: "Mar 28", balance: 6733.51 },
  { date: "Apr 01", balance: 6583.31 },
];

export const expensesByCategory = [
  { name: "Food", value: 200.7 },
  { name: "Utilities", value: 145.0 },
  { name: "Entertainment", value: 15.99 },
];
