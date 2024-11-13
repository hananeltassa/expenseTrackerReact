import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Register from './components/Register';
import Login from './components/Login';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Set up routing */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
