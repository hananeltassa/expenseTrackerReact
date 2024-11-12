import React, { useState } from "react";
import "../styles/styles.css";

function ExpenseTracker() {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    type: "income",
  });

  const [filterData, setFilterData] = useState({
    type: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    console.log("Transaction Added:", formData);

  };

  const handleFilterTransactions = (e) => {
    e.preventDefault();
    console.log("Filter Applied:", filterData);
  };

  return (
    <div>
      <header className="expense-tracker-header">
        <h1>Expense Tracker</h1>
      </header>

      <main>
        <div className="container">
          {/* Add Transaction Form */}
          <section className="expense-section" id="add-transaction-container">
            <h2>Add Transaction</h2>
            <form onSubmit={handleAddTransaction}>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Transaction Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <button type="submit" className="btn">
                Add Transaction
              </button>
            </form>
          </section>

          {/* Filter Transactions Form */}
          <section className="expense-section filter-container">
            <h2>Filter Transactions</h2>
            <form onSubmit={handleFilterTransactions}>
              <div className="form-group">
                <label htmlFor="filter-type">Type</label>
                <select
                  id="filter-type"
                  name="type"
                  value={filterData.type}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="minAmount">Min Amount</label>
                <input
                  type="number"
                  id="minAmount"
                  name="minAmount"
                  step="0.01"
                  placeholder="Min amount"
                  value={filterData.minAmount}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="maxAmount">Max Amount</label>
                <input
                  type="number"
                  id="maxAmount"
                  name="maxAmount"
                  step="0.01"
                  placeholder="Max amount"
                  value={filterData.maxAmount}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={filterData.startDate}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={filterData.endDate}
                  onChange={handleFilterChange}
                />
              </div>

              <button type="submit" className="btn">
                Apply Filter
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => console.log("Delete Matching Transactions")}
              >
                Delete Matching Transactions
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ExpenseTracker;
