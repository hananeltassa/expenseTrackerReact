import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/styles.css";

function ExpenseTracker() {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('income');
    const [userId, setUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUserId(userData.user_id); 
      } else {
        setErrorMessage('User not logged in');
      }
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!description || !amount || !date || !userId) {
        setErrorMessage('All fields are required');
        return;
      }
  
      const transactionData = {
        description,
        amount,
        date,
        type,
        user_id: userId, 
      };
  
      try {
        const response = await fetch('http://localhost/expenseTrackerApis/add_transaction.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transactionData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setSuccessMessage('Transaction added successfully!');
          setDescription('');
          setAmount('');
          setDate('');
          setType('income');
        } else {
          setErrorMessage(data.error || 'Failed to add transaction');
        }
      } catch (error) {
        setErrorMessage('Network error. Please try again.');
      }
    };
  
    return (
      <div className="container">
        <h2>Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-gp">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>
          <div className="form-gp">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="form-gp">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-gp">
            <label htmlFor="type">Transaction Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <button type="submit">Add Transaction</button>
        </form>
      </div>
    );
  };

export default ExpenseTracker;
