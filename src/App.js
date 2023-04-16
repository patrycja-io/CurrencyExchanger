
import { useState } from 'react';
import axios from 'axios';


const Converter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('JPY');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleConvert = () => {
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => {
        const rate = response.data.rates[toCurrency];
        const result = amount * rate;
        setResult(result.toFixed(2));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConvert();
    }
  };
  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <form className="exchange-form">
        <div className="form-row">
          <label htmlFor="from-currency">From:</label>
          <select
              id="from-currency"
              value={fromCurrency} onChange={handleFromCurrencyChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="GBP">GBP</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
          </select>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter amount"
          />
        </div>
        <div className="form-row">
          <label htmlFor="to-currency">Exchange to:</label>
          <select
            id="to-currency"
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="GBP">GBP</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
          </select>
          <button className="exchange-button" type="button" onClick={handleConvert}>
            Convert
          </button>
        </div>
        <div className="form-row">
          <label htmlFor="result">Result:</label>
          <input
            type="text"
            id="result"
            value={result}
            onChange={() => {}}
            readOnly
          />
        </div>
      </form>
    </div>
  );
}

export default Converter;