import React, { useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleExchange = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRate(data.rates[toCurrency]);
      });
  };

  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return (
    <div className="app">
      <h1>Currency Exchange</h1>
      <div className="exchange-form">
        <div className="form-row">
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
        </div>
        <div className="form-row">
          <label htmlFor="from-currency">From:</label>
          <select id="from-currency" value={fromCurrency} onChange={handleFromCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="to-currency">To:</label>
          <select id="to-currency" value={toCurrency} onChange={handleToCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <button className="exchange-button" onClick={handleExchange}>Exchange</button>
      </div>
      {exchangeRate > 0 && (
        <div className="result">
          <p>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
        </div>
      )}
    </div>
  );
}

export default App;
