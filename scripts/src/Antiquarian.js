import React, { Component } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import isbn from "isbn-utils";

import AntiquarianTable from "./AntiquarianTable.js";
import AntiquarianQuote from "./AntiquarianQuote.js";
import IsbnElement from "./IsbnElement.js";
import SaleElement from "./SaleElement.js";
import PurchaseElement from "./PurchaseElement.js";

class Antiquarian extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      shipping: "",
      ean: "",
      purchase: 0,
      sale: 0,
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
        "NOK",
        "NZD",
        "PLN",
        "SEK",
        "SGD",
        "ZAR"
      ],
      rates: {},
      condition: "Unknown",
      description: "",
      discount: "",
      currency: "EUR",
      url: "",
      lastUpdated: "",
      title: "Unknown",
      author: "Unknown",
      antiqList: [
        { min: 1, max: 9, price: 35 },
        { min: 10, max: 24, price: 40 },
        { min: 25, max: 27, price: 45 },
        { min: 28, max: 31, price: 50 },
        { min: 32, max: 33, price: 55 },
        { min: 34, max: 37, price: 60 },
        { min: 38, max: 40, price: 65 },
        { min: 41, max: 43, price: 70 },
        { min: 44, max: 45, price: 75 },
        { min: 46, max: 49, price: 80 },
        { min: 50, max: 52, price: 85 },
        { min: 53, max: 55, price: 90 },
        { min: 56, max: 58, price: 95 },
        { min: 59, max: 61, price: 100 },
        { min: 62, max: 64, price: 105 },
        { min: 65, max: 67, price: 110 },
        { min: 68, max: 70, price: 115 },
        { min: 71, max: 73, price: 120 },
        { min: 74, max: 76, price: 125 },
        { min: 77, max: 79, price: 130 },
        { min: 80, max: 82, price: 135 },
        { min: 83, max: 85, price: 140 },
        { min: 86, max: 88, price: 145 },
        { min: 89, max: 92, price: 150 },
        { min: 93, max: 94, price: 155 },
        { min: 95, max: 96, price: 160 },
        { min: 97, max: 99, price: 165 },
        { min: 100, price: "Custom" }
      ],
      fetching: false,
      unable: false
    };

    this.changeEAN = this.changeEAN.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeShipping = this.changeShipping.bind(this);
    this.changeDiscount = this.changeDiscount.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeURL = this.changeURL.bind(this);
    this.changeCondition = this.changeCondition.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changePurchase = this.changePurchase.bind(this);
    this.fetchTitle = this.fetchTitle.bind(this);
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
      this.setState({ amount: e.target.value }, () => {
        this.changePurchase();
      });
    }
  }

  changeShipping(e) {
    if (!isNaN(e.target.value)) {
      this.setState({ shipping: e.target.value }, () => {
        this.changePurchase();
      });
    }
  }

  changeDiscount(e) {
    if (!isNaN(e.target.value)) {
      this.setState({ discount: e.target.value }, () => {
        this.changePurchase();
      });
    }
  }

  changeEAN(e) {
    this.setState({ ean: e.target.value });
  }

  changeURL(e) {
    this.setState({ url: e.target.value });
  }

  changeCondition(e) {
    this.setState({ condition: e.target.value });
  }

  changeDescription(e) {
    this.setState({ description: e.target.value });
  }

  changeCurrency(e) {
    this.setState({ currency: e.target.value }, () => {
      this.changePurchase();
    });
  }

  changePurchase() {
    let {
      amount,
      shipping,
      currency,
      rates,
      antiqList,
      sale,
      purchase,
      discount
    } = this.state;

    if (currency != "EUR") {
      amount = !isNaN(amount) && amount / rates[currency];
      shipping = !isNaN(shipping) && shipping / rates[currency];
    }

    purchase = Math.ceil(Number(amount) + Number(shipping));
    sale = Number(purchase)
      ? Number(purchase) <= 100
        ? antiqList.find(x => {
            return purchase >= x.min && purchase <= x.max;
          }).price
        : 999
      : "";

    if (discount && Number(purchase) <= 100) {
      sale = Math.ceil(sale / (1 - discount / 100));
    }

    this.setState({ purchase, sale });
  }

  fetchTitle() {
    this.setState({ fetching: true });

    const { ean } = this.state;
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        isbn.parse(ean).asIsbn13() +
        "&maxResults=3&key=AIzaSyDoOCTxCWWoFIlGvVQ0ZCiveGE9sDXFyeA"
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.totalItems > 0) {
          this.setState({
            title: res.items[0].volumeInfo.title,
            author: res.items[0].volumeInfo.authors[0],
            fetching: false,
            unable: false
          });
        } else {
          this.setState({ fetching: false, unable: true });
        }
      });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const {
      amount,
      shipping,
      purchase,
      ean,
      currency,
      currencyList,
      lastUpdated,
      url,
      antiqList,
      sale,
      fetching,
      title,
      author,
      unable,
      condition,
      description,
      discount
    } = this.state;

    return (
      <div>
        <div class="left">
          <div className="basic-form">
            <label htmlFor="isbn">ISBN</label>
            <div className="group">
              <input
                id="isbn"
                type="text"
                placeholder="9780123456789"
                value={ean}
                className={ean == "" || isbn.parse(ean) ? "" : "invalid"}
                onChange={this.changeEAN}
                autoFocus={true}
              />
              <button
                className={fetching && "loading"}
                disabled={isbn.parse(ean) == null || ean == ""}
                onClick={this.fetchTitle}
              >
                Fetch title data
              </button>
            </div>
            {unable && <small className="help error">Unable to find</small>}

            <label htmlFor="amount">Price</label>
            <div className="group">
              <input
                id="amount"
                type="number"
                placeholder="Base amount"
                value={amount}
                step=".01"
                onChange={this.changeAmount}
                required
              />
              <select
                id="currency"
                onChange={this.changeCurrency}
                style={{ width: "1%" }}
              >
                {currencyList.map((curr, i) => (
                  <option key={i} value={curr} selected={curr == currency}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>

            <label htmlFor="shipping">Shipping</label>
            <input
              id="shipping"
              type="number"
              placeholder="Leave empty if no shipping"
              value={shipping}
              step=".01"
              onChange={this.changeShipping}
            />

            <label htmlFor="discount">Discount</label>
            <div className="group">
              <input
                id="discount"
                type="number"
                placeholder="Leave empty if no discount"
                value={discount}
                step="1"
                max="100"
                onChange={this.changeDiscount}
              />
              <label>%</label>
            </div>

            <label htmlFor="url">Source</label>
            <input
              id="url"
              type="url"
              placeholder="http://"
              value={url}
              onChange={this.changeURL}
            />

            <label htmlFor="condition">Condition</label>
            <select
              id="condition"
              value={condition}
              onChange={this.changeCondition}
            >
              <option value="Unknown">Unknown</option>
              <option value="New">New</option>
              <option value="Used - Like New">Used - Like New</option>
              <option value="Used - Very Good">Used - Very Good</option>
              <option value="Used - Good">Used - Good</option>
              <option value="Used - Acceptable">Used - Acceptable</option>
              <option value="Ex-Library Copy">Ex-Library Copy</option>
            </select>

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Leave empty if no description"
              onChange={this.changeDescription}
            >
              {description}
            </textarea>
          </div>

          <AntiquarianQuote
            author={author}
            title={title}
            ean={ean}
            url={url}
            condition={condition}
            description={description}
            amount={amount}
            shipping={shipping}
            currency={currency}
            sale={sale}
            discount={discount}
          />
        </div>

        <div className="right">
          <AntiquarianTable
            purchase={purchase}
            lastUpdated={lastUpdated}
            antiqList={antiqList}
          />

          <ul>
            <strong>Franse klanten GEEN korting. Behalve:</strong>
            <li>Université Paris-Dauphine o.a. 44912</li>
            <li>INHA</li>
            <li>
              Université Paris 3 22223 (Ste-Geneviève), 22345 (Censier),{" "}
              <strong>behalve</strong> 22767
            </li>
            <li>
              Université Paris 1 Pantheon Sorbonne o.a. 22222, 22244, Cujas
              22224
            </li>
            <li>Université Lyon 22157 (vanaf 2015, niet op Franstalig)</li>
            <li>
              Université Bordeaux Montaigne, o.a. 22269, 22359 (vanaf 2015)
            </li>
            <li>IEP Pessac 45200, 45305, 45306, 45321 (vanaf 2015)</li>
            <li>Sorbonne Université, o.a. 22319, 22218, 44062, etc</li>
            <li>La Rochelle 22285, etc</li>
            <li>Louvre 44421 (-5%)</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Antiquarian;
