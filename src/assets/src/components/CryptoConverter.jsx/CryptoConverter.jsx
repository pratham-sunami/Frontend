import React, { useEffect, useState } from "react";

const CryptoConverter = () => {
  const [amount, setAmount] = useState(0);
  const CURRENCY_OPTIONS = ["USD", "EUR", "GBP", "CNY"];
  const CRYPTO_API = "https://api.frontendeval.com/fake/crypto";
  const [currency, setCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(0);
  const [convertedRate, setConvertedRate] = useState(0);
  const [prevConvertedRate, setPrevConvertedRate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${CRYPTO_API}/${currency}`);
      const parseData = await data.json();
      setConversionRate(parseData.value);
    };

    fetchData();
    const IntervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(IntervalId);
    };
  }, [currency]);

  useEffect(() => {
    const newValue = amount * conversionRate;
    setPrevConvertedRate(convertedRate);
    setConvertedRate(newValue);
  }, [conversionRate, amount]);

  let priceChange = convertedRate - prevConvertedRate;
  return (
    <div>
      <div style={{ display: "flex", gap: "10px"}}>
        <label>
          Amount to convert:
          <input
            value={amount}
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
          ></input>
        </label>
        <label>
          Currency:
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {CURRENCY_OPTIONS.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <p>WUC Crypto Equivalent:{convertedRate.toFixed(2)}</p>
      <p
        aria-live="polite"
        style={{ color: priceChange > 0 ? "green" : "red" }}
      >
        Change :{priceChange > 0 ? "⬆️" : "🔻"} {priceChange.toFixed(2)}
      </p>
    </div>
  );
};

export default CryptoConverter;
