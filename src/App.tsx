// src/App.tsx
import React, { useState } from 'react';
import './global.css';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/DashBoard';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn ? (
        <Dashboard />
      ) : (
        <LoginRegister onLogin={() => setLoggedIn(true)} />
      )}
    </>
  );
};

export default App;

