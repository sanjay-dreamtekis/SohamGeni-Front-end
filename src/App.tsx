import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import LoginPage from './Component/Login/Login';
import './App.css';

function App() {
  return (
    <Router> {/* Ensure Router wraps around your entire application */}
      <div className="App">
        <LoginPage />
      </div>
    </Router>
  );
}

export default App;
