import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";


export default function App1() {

    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState("");

    const [famount, setFamount] = useState("");
    const [convertedFAmount, setConvertedFAmount] = useState("");


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


    const [defaultoption, setdefaultoption] = useState("GBP");
    const options = [
        { value: 'EUR', label: 'EUR' },
        { value: 'USD', label: 'USD' },
        { value: 'PKR', label: 'PKR' },
        { value: 'AFN', label: 'AFN' }
    ];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleConvert = () => {

        let convertedValue;

        if (selectedOption.value === "USD") {
            convertedValue = famount * usdExchangeRate;
        } else if (selectedOption.value === "AFN") {
            // Conversion logic for AFN
            convertedValue = famount * afnExchangeRate;
        } else if (selectedOption.value === "PKR") {
            // Conversion logic for PKR
            convertedValue = famount * pkrExchangeRate;
        } else if (selectedOption.value === "EUR") {
            // Conversion logic for EUR
            convertedValue = famount * eurExchangeRate;
        }

        // Set the converted amount in the state
        setConvertedFAmount(convertedValue);
    };


    const handleAmountChange = (e) => {
        setFamount(e.target.value);
    };



    useEffect(() => {
        fetchExchangeRates();
    }, []);

    const getCurrencyIcon = (currency) => {
        switch (currency) {
            case 'USD':
                return <RiFlag2Line className="currency-icon" />;
            case 'PKR':
                return <RiFlag2Line className="currency-icon" />;
            case 'AFN':
                return <RiFlag2Line className="currency-icon" />;
            case 'EUR':
                return <RiFlag2Line className="currency-icon" />;
            default:
                return null;
        }
    };

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
        <div>

            <Select
                options={options}
                value={selectedOption}
                onChange={handleOptionSelect}
                placeholder={selectedOption}
                classNamePrefix="bootstrap-select"
                className="bootstrap-select-container"
                menuPlacement="auto"
            />
            <h5>Todays Currency Rate</h5>
            <h3>
                <span className="bold1">1 GBP = </span>
                {selectedOption && selectedOption.value === 'USD' && <span>{usdExchangeRate} USD </span>}
                {selectedOption && selectedOption.value === 'PKR' && <span>{pkrExchangeRate} PKR </span>}
                {selectedOption && selectedOption.value === 'AFN' && <span>{afnExchangeRate} AFN </span>}
                {selectedOption && selectedOption.value === 'EUR' && <span>{eurExchangeRate} EUR </span>}
            </h3>

            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h4>From GBP</h4>
                      



                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter amount"
                                id="amountInput"
                                value={famount}
                                onChange={handleAmountChange}
                                

                            />
                        </div>

                    </div>

                    <div className="col-md-6">
                        <h4>To <span>{selectedOption && selectedOption.value}</span></h4>


                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Converted amount"
                                value={convertedFAmount}
                                readOnly
                            />





                        </div>

                    </div>


                    <button className="btn btn-primary"
                        onClick={handleConvert}
                        style={{ backgroundColor: '#19c9d6', marginTop: '2em' }}
                    >
                        Convert
                    </button>

                </div>

            </div>

        </div>





    );






}