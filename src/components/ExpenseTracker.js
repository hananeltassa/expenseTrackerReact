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
    const [transactions, setTransactions] = useState([]);
    const [filters, setFilters] = useState({
      type: '',
      min_amount: '',
      max_amount: '',
      start_date: '',
      end_date: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUserId(userData.user_id); 
      } else {
        setErrorMessage('User not logged in');
        navigate('/login');
      }
    }, [navigate]);
    
  
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
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters((prev) => ({ ...prev, [name]: value }));
    };
    const handleFilterSubmit = async (e) => {
      e.preventDefault();
      
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
          setErrorMessage('User not logged in');
          return;
      }
  
      const userData = JSON.parse(storedUser);
      const userId = userData.user_id;
  
      const queryParams = new URLSearchParams();
      
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.min_amount) queryParams.append('min_amount', filters.min_amount);
      if (filters.max_amount) queryParams.append('max_amount', filters.max_amount);
      if (filters.start_date) queryParams.append('start_date', filters.start_date);
      if (filters.end_date) queryParams.append('end_date', filters.end_date);
  
      queryParams.append('user_id', userId);
  
      console.log(`API URL: http://localhost/expenseTrackerApis/filter_transaction.php?${queryParams.toString()}`);
      
      try {
          const response = await fetch(`http://localhost/expenseTrackerApis/filter_transaction.php?${queryParams.toString()}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          const data = await response.json();
          
          if (response.ok) {
              setTransactions(data); 
          } else {
              setErrorMessage(data.error || 'Failed to fetch transactions');
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
        {/* Filter Section */}
      <section className="filter-container">
        <h2>Filter Transactions</h2>
        <form onSubmit={handleFilterSubmit}>
          <div className="form-gp">
            <label htmlFor="type">Type:</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-gp">
            <label htmlFor="min_amount">Min Amount:</label>
            <input
              type="number"
              name="min_amount"
              value={filters.min_amount}
              onChange={handleFilterChange}
              step="0.01"
              placeholder="Min amount"
            />
          </div>

          <div className="form-gp">
            <label htmlFor="max_amount">Max Amount:</label>
            <input
              type="number"
              name="max_amount"
              value={filters.max_amount}
              onChange={handleFilterChange}
              step="0.01"
              placeholder="Max amount"
            />
          </div>

          <div className="form-gp">
            <label htmlFor="start_date">Start Date:</label>
            <input
              type="date"
              name="start_date"
              value={filters.start_date}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-gp">
            <label htmlFor="end_date">End Date:</label>
            <input
              type="date"
              name="end_date"
              value={filters.end_date}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-gp">
            <button type="submit">Apply Filter</button>
          </div>
        </form>
      </section>

      {/* Display Filtered Transactions */}
      <section className="transaction-list">
        <h2>Transactions</h2>
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                {transaction.description} - {transaction.amount} - {transaction.date} - {transaction.type}
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found</p>
        )}
      </section>
      </div>
    );
  };

export default ExpenseTracker;
