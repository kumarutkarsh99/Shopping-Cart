# 🛍️ React Cart Frontend

This is a responsive and functional ecommerce frontend built using **React**, **Context API**, **Material UI**, and **localStorage**. It allows users to browse products, filter and search items, manage a shopping cart, and simulate checkout functionality with persistent state.

---

## Features

- Add, remove and update cart items
- Stock-aware product management
- Filter by category, price and search keyword
- Persistent cart and product state using `localStorage`
- State management via Context API and `useReducer`
- Modern UI with Material UI components

---

## Tech Stack

- **React** – Component-based UI library
- **Material UI** – For modern and responsive UI components
- **Context API** – For global state management
- **localStorage** – For persistent cart and stock state

---

## Getting Started

```bash
git clone https://github.com/kumarutkarsh99/react-ecommerce-frontend.git
cd react-ecommerce-frontend
npm install
npm run dev
```

## State Management

This app uses two main context providers:
- CartContext – Manages cart items, quantities, and checkout logic.
- ProductContext – Manages product inventory, filtering, and search.
- All state changes are persisted using localStorage so data remains after page reloads.


```

Made with ❤️ by Kumar Utkarsh
