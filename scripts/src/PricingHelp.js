import React, { Component } from "react";
import PricingHelpTable from "./PricingHelpTable.js";
import VatTable from "./VatTable.js";

class PricingHelp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastUpdated: "",
      amount: "",
      currencyList: [
        "EUR",
        "USD",
        "GBP",
        "AUD",
        "BRL",
        "CAD",
        "CHF",
        "CNY",
        "DKK",
        "HKD",
        "JPY",
        "MYR",
        "NOK",
        "NZD",
        "PLN",
        "SEK",
        "SGD",
        "ZAR"
      ],
      rates: {},
      currency: "EUR",
      vatList: [4, 5, 5.5, 6, 7, 8, 9, 10, 15, 17, 19, 20, 21, 25]
    };

    this.changeAmount = this.changeAmount.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
  }

  componentDidMount() {
    fetch("/wordpress/wp-json/curr/newest")
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ rates: res.rates, lastUpdated: res.date });
      });
  }

  changeAmount(e) {
    if (!isNaN(e.target.value)) {
      this.setState({ amount: e.target.value });
    }
  }

  changeCurrency(e) {
    this.setState({ currency: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const {
      amount,
      lastUpdated,
      currencyList,
      rates,
      currency,
      vatList
    } = this.state;

    return (
      <div>
        <form
          className="group"
          id="pricing-help-input"
          onSubmit={this.handleSubmit}
        >
          <input
            id="base-amount"
            type="number"
            placeholder="Base amount"
            value={amount}
            step=".01"
            onChange={this.changeAmount}
            autoFocus
            required
          />

          <select onChange={this.changeCurrency}>
            {currencyList.map((curr, i) => (
              <option key={i} value={curr} selected={curr == currency}>
                {curr}
              </option>
            ))}
          </select>

          <button type="submit" className="primary">
            Convert
          </button>
        </form>

        <div id="pricing-help-updated">
          Conversion rates by <a href="https://fixer.io/">Fixer</a> <br />
          <span className="last-updated">
            Last updated: <strong>{lastUpdated}</strong> (Reload page to fetch
            new rates)
          </span>
        </div>

        <PricingHelpTable
          amount={amount}
          currencyList={currencyList}
          currency={currency}
          rates={rates}
          lastUpdated={lastUpdated}
        />

        <VatTable amount={amount} vatList={vatList} />
      </div>
    );
  }
}

export default PricingHelp;
