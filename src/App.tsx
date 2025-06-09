import React, { useState } from 'react';
import './global.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/DashBoard';
import ManageTopics from './pages/ManageTopics';
import ManageResources from './pages/ManageResources';
import GenerateQuestions from './pages/GenerateQuestions';
import QuestionBank from './pages/QuestionBank';
import Profile from './pages/Profile';


const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <LoginRegister onLogin={() => setLoggedIn(true)} />;
  }
  // Using Local Storage...
// const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
// const handleLogout = () => {
//   localStorage.removeItem('token');
//   setLoggedIn(false);
// };
    

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/manage-topics" element={<ManageTopics />} />
      <Route path="/manage-resources" element={<ManageResources />} />
      <Route path="/generate-questions" element={<GenerateQuestions />} />
      <Route path="/question-bank" element={<QuestionBank />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;