import React, { useEffect, useState } from "react";
import axios from "axios";


export default function App() {

  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");


  const [usdExchangeRate, setUSDExchangeRate] = useState("");
  const [usdfromCurrency, setusdFromCurrency] = useState("");
  const [usdtoCurrency, setusdToCurrency] = useState("");

  const [afnExchangeRate, setAFNExchangeRate] = useState("");
  const [afnfromCurrency, setafnFromCurrency] = useState("");
  const [afntoCurrency, setafnToCurrency] = useState("");

  const [pkrExchangeRate, setPKRExchangeRate] = useState("");
  const [pkrfromCurrency, setpkrFromCurrency] = useState("");
  const [pkrtoCurrency, setpkrToCurrency] = useState("");

  const [eurExchangeRate, setEURExchangeRate] = useState("");
  const [eurfromCurrency, seteurFromCurrency] = useState("");
  const [eurtoCurrency, seteurToCurrency] = useState("");


  const usdWeSellRate = (usdExchangeRate * 1.07).toFixed(3); // 7% increment
  const usdWeBuyRate = (usdExchangeRate * 0.93).toFixed(3); // 7% decrement
  const afnWeSellRate = (afnExchangeRate * 1.07).toFixed(3);
  const afnWeBuyRate = (afnExchangeRate * 0.93).toFixed(3);
  const pkrWeSellRate = (pkrExchangeRate * 1.07).toFixed(3);
  const pkrWeBuyRate = (pkrExchangeRate * 0.93).toFixed(3);
  const eurWeSellRate = (eurExchangeRate * 1.07).toFixed(3);
  const eurWeBuyRate = (eurExchangeRate * 0.93).toFixed(3);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = () => {
    const currencies = ["USD", "AFN", "PKR", "EUR"]; // Add the currencies you want to fetch
    var myHeaders = new Headers();
    myHeaders.append("apikey", "TpiOJ23384xqPs2CdUW3bPHOiH3Ah9hj");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    const requests = currencies.map(currency => {
      const url = `https://api.apilayer.com/exchangerates_data/convert?to=${currency}&from=GBP&amount=1`;
      return fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (currency === "USD") {
            setUSDExchangeRate(data.info.rate);
            setusdFromCurrency(data.query.from);
            setusdToCurrency(data.query.to);

          } else if (currency === "AFN") {
            setAFNExchangeRate(data.info.rate);
            setafnFromCurrency(data.query.from);
            setafnToCurrency(data.query.to);

          } else if (currency === "PKR") {
            setPKRExchangeRate(data.info.rate);
            setpkrFromCurrency(data.query.from);
            setpkrToCurrency(data.query.to);

          } else if (currency === "EUR") {
            setEURExchangeRate(data.info.rate);
            seteurFromCurrency(data.query.from);
            seteurToCurrency(data.query.to);

          }
          return data;

        });
    });






    Promise.all(requests)
      .then(results => {

        console.log(results);
      })
      .catch(error => console.log('Error:', error));
  };

  // Call the function to fetch the exchange rates
  return (


    
      <div class="container">
        <div class="table">
          <table>
            <thead>
              <tr>
                <th>From Currency</th>
                <th>We Sell</th>
                <th>We Buy</th>
                

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>USD</td>
                <td>{usdWeBuyRate}</td>
                <td>{usdWeSellRate}</td>

              </tr>
            </tbody>
            <tr>
              <td>AFN</td>
              <td>{afnWeBuyRate}</td>
              <td>{afnWeSellRate}</td>

            </tr>
            <tr>
              <td>PKR</td>
              <td>{pkrWeBuyRate}</td>
              <td>{pkrWeSellRate}</td>

            </tr>
            <tr>
              <td>EUR</td>
              <td>{eurWeBuyRate}</td>
              <td>{eurWeSellRate}</td>
              

            </tr>
          </table>
        </div>
      </div>










  );






}