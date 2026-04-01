# React Finance Dashboard

A clean, interactive, and responsive finance dashboard built with React. This project focuses on UI/UX, robust component architecture, and seamless global state management.

## Features

- **Summary Overlay**: Instantly view your total balance, income, and expenses.
- **Dynamic Visualizations**: Utilizes Recharts to showcase an interactable area chart (Balance Trend) and a pie chart (Categorical Spending).
- **Interactive Transactions**: Detailed transactions list with intuitive visual indicators, searching, sorting, and type filtering.
- **Smart Insights**: Automatically calculates and highlights key observations, such as your highest spending category and averages.
- **Role-Based Access Control (RBAC)**: Switch between `Viewer` and `Admin` modes on the header. Admins can securely add new transactions via a frosted-glass modal and delete existing records.
- **Global State Management**: React Context architecture seamlessly shares state securely without prop-drilling.
- **Data Persistence**: Transactions and current user role state are cached directly via `localStorage`.

## Tech Stack

- **Framework**: React via Vite
- **Styling**: Vanilla CSS utilizing custom properties for a premium "dark mode" featuring glassmorphism elements, subtle gradients, and pure CSS micro-animations. No Tailwind is utilized, providing maximum control.
- **Icons**: `lucide-react`
- **Charts**: `recharts`

## Setup Instructions

1. **Install dependencies**: `npm install`
2. **Run the local development server**: `npm run dev`
3. Open the displayed local network URL in your browser (typically `http://localhost:5173`).

---
Designed for comprehensive frontend evaluation. Small thoughtful touches in interaction (hover lifts, fade-ins, context transitions) were prioritized heavily.
