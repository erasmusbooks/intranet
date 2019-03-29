import React, { Component } from "react";
import isbn from "isbn-utils";

import AntiquarianQuote from "./AntiquarianQuote";
import IsbnConverterTable from "./IsbnConverterTable";
import PricingHelpTable from "./PricingHelpTable";
import VatTable from "./VatTable";
import SearchTable from "./SearchTable";
import HelpTable from "./HelpTable";

class Robot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      queryList: [],
      queryPos: 0,
      output: [],
      rates: {},
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
      lastUpdated: ""
    };

    this.changeQuery = this.changeQuery.bind(this);
    this.keypressQuery = this.keypressQuery.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.addOutput = this.addOutput.bind(this);
    this.addPricingHelp = this.addPricingHelp.bind(this);
    this.addSearch = this.addSearch.bind(this);
    this.addAntiq = this.addAntiq.bind(this);
  }

  componentDidMount() {
    const { output } = this.state;

    fetch("/wordpress/wp-json/curr/newest")
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ rates: res.rates, lastUpdated: res.date });
      });

    output.push([
      <time>{new Date().toLocaleTimeString()}</time>,
      <span>
        Welcome to the <strong>Robot</strong>, your friendly neighborhood
        command line. Here you can do simple calculations, currency convertions
        and fetch book records, in one place. Type <kbd>help</kbd> for a list of
        commands and examples
      </span>
    ]);

    this.setState({ output });
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  changeQuery(e) {
    this.setState({ query: e.target.value });
  }

  keypressQuery(e) {
    const { query, queryList, queryPos } = this.state;

    if (e.key == "ArrowUp" && queryPos > 0) {
      this.setState({
        query: queryList[queryPos - 1],
        queryPos: queryPos - 1,
        queryList
      });
    }

    if (e.key == "ArrowDown") {
      this.setState({
        query: queryPos < queryList.length ? queryList[queryPos + 1] : "",
        queryPos: queryPos < queryList.length ? queryPos + 1 : queryList.length
      });
    }
  }

  addPricingHelp(q, arr) {
    const { rates, lastUpdated } = this.state;

    if (!arr[1]) {
      this.addOutput(
        <span>
          Unable to process <strong>{q}</strong> input. To use Pricing Help,
          please provide base amount and currency: <kbd>c 16.50 usd</kbd> or{" "}
          <kbd>c sgd 99 myr</kbd>.
        </span>
      );
    } else {
      let currency = isNaN(arr[1])
        ? arr[1].toUpperCase()
        : arr[2] == undefined
        ? "EUR"
        : isNaN(arr[2])
        ? arr[2].toUpperCase()
        : null;
      let amount = isNaN(arr[2]) ? arr[1] : arr[2];
      let conv = false;

      if (arr[3]) conv = arr[3].toUpperCase();

      let currencyList;

      if (conv) {
        currencyList = [currency, conv];
      } else if (arr[2] == undefined) {
        currencyList = ["EUR", "USD", "GBP"];
      } else {
        currencyList = [
          "EUR",
          "USD",
          "GBP",
          "AUD",
          "BRL",
          "CAD",
          "CHF",
          "CNY",
          "JPY",
          "ZAR"
        ];
      }

      if (currencyList.indexOf(currency) < 0) currencyList.push(currency);

      this.addOutput(
        <PricingHelpTable
          amount={amount}
          currencyList={currencyList}
          rates={rates}
          currency={currency}
          lastUpdated={lastUpdated}
        />
      );
    }
  }

  addVat(q, arr) {
    if (isNaN(arr[1])) {
      this.addOutput(
        <span>
          Unable to process <strong>{msg}</strong> input. To use VAT conversion,
          please provide a valid base amount: <kbd>vat 85.25</kbd>.
        </span>
      );
    } else {
      this.addOutput(
        <VatTable
          amount={arr[1]}
          vatList={[4, 5, 5.5, 6, 7, 8, 9, 10, 19, 20, 21]}
        />
      );
    }
  }

  addIsbn(q, arr) {
    this.addOutput(
      isbn.parse(arr[1]) ? (
        <IsbnConverterTable source={arr[1]} />
      ) : (
        <span>
          Unable to process <kbd className="user">{q}</kbd> input. To use ISBN
          conversion, please provide a valid ISBN:{" "}
          <kbd>isbn 978-3-16-148410-0</kbd>.
        </span>
      )
    );
  }

  addSearch(q, arr) {
    if (arr.length > 1) {
      let s = "";
      arr.forEach((w, i) => {
        if (i == 1) s = s + w;
        if (i > 1) s = s + "+" + w;
      });

      fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          s +
          "&maxResults=3&key=AIzaSyDoOCTxCWWoFIlGvVQ0ZCiveGE9sDXFyeA"
      )
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.totalItems > 0) {
            this.addOutput(<SearchTable books={res.items} />);
          } else {
            this.addOutput(
              <span>
                No results found for <kbd className="user">{q}</kbd>
              </span>
            );
          }
        });
    } else {
      this.addOutput(
        <span>
          Unable to process <kbd className="user">{q}</kbd> input. To use Book
          search, please provide a valid search term:{" "}
          <kbd>search ulysses joyce</kbd> or <kbd>q 9780679732266</kbd>.
        </span>
      );
    }
  }

  addHelp(q, arr) {
    this.addOutput(<HelpTable />);
  }

  addAntiq(q, arr) {
    const { rates, antiqList } = this.state;

    console.log(arr);

    let amount = Number(arr[1]),
      shipping = !isNaN(arr[2]) && Number(arr[2]),
      currency = rates[arr[2].toUpperCase()]
        ? arr[2].toUpperCase()
        : rates[arr[3].toUpperCase()]
        ? arr[3].toUpperCase()
        : "EUR",
      ean = arr.filter(a => {
        return isbn.parse(a) != null;
      }),
      discount =
        !isNaN(arr[4]) && arr[4] < 100
          ? Number(arr[4])
          : !isNaN(arr[5]) && arr[5] < 100
          ? Number(arr[5])
          : false;

    const origAmount = amount,
      origShipping = shipping;

    if (currency != "EUR") {
      amount = !isNaN(amount) && amount / rates[currency];
      shipping = !isNaN(shipping) && shipping / rates[currency];
    }

    const purchase = Math.ceil(Number(amount) + Number(shipping));
    let sale = Number(purchase)
      ? Number(purchase) <= 100
        ? antiqList.find(x => {
            return purchase >= x.min && purchase <= x.max;
          }).price
        : 999
      : "";

    if (discount && Number(purchase) <= 100) {
      sale = Math.ceil(sale / (1 - discount / 100));
    }

    console.log(amount, shipping, currency, sale, discount);

    if (ean.length) {
      fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          isbn.parse(ean[0]).asIsbn13() +
          "&maxResults=3&key=AIzaSyDoOCTxCWWoFIlGvVQ0ZCiveGE9sDXFyeA"
      )
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.totalItems > 0) {
            this.addOutput(
              <AntiquarianQuote
                author={res.items[0].volumeInfo.authors[0]}
                title={res.items[0].volumeInfo.title}
                ean={isbn.parse(ean[0]).asIsbn13()}
                url="http://"
                condition=""
                description=""
                amount={origAmount}
                shipping={origShipping}
                currency={currency}
                sale={sale}
                discount={discount}
              />
            );
          } else {
            this.addOutput(
              <AntiquarianQuote
                author="Unknown"
                title="Unknown"
                ean={isbn.parse(ean[0]).asIsbn13()}
                url="http://"
                condition=""
                description=""
                amount={origAmount}
                shipping={origShipping}
                currency={currency}
                sale={sale}
                discount={discount}
              />
            );
          }
        });
    } else {
      this.addOutput(
        <AntiquarianQuote
          author="Unknown"
          title="Unknown"
          ean="Unknown"
          url="http://"
          condition="Unknown"
          description=""
          amount={origAmount}
          shipping={origShipping}
          currency={currency}
          sale={sale}
          discount={discount}
        />
      );
    }
  }

  addOutput(el, user) {
    const { output } = this.state;

    output.push(
      user
        ? [
            <svg className="input">
              <use xlinkHref="http://db/wordpress/wp-content/themes/nausikaa/icons/icons.svg#chevron-down" />
            </svg>,
            el
          ]
        : [<time>{new Date().toLocaleTimeString()}</time>, el]
    );

    this.setState({ output });
  }

  submitQuery(e) {
    e.preventDefault();
    const { query, queryList, rates, lastUpdated } = this.state;

    if (query) {
      queryList.push(query);

      this.addOutput(<kbd className="user input">{query}</kbd>, true);
      this.setState({ query: "", queryList, queryPos: queryList.length });

      const queryArray = query.split(" ");
      const q = queryArray[0].toLowerCase();

      if (q.match(/^(ph|price|c|curr|currency)$/)) {
        this.addPricingHelp(query, queryArray);
      } else if (q.match(/^(vat|btw|tva|mwst)$/)) {
        this.addVat(query, queryArray);
      } else if (q.match(/^(i|isbn)$/)) {
        this.addIsbn(query, queryArray);
      } else if (q.match(/^(s|search|q|query)$/)) {
        this.addSearch(query, queryArray);
      } else if (q.match(/^(a|antiq)$/)) {
        this.addAntiq(query, queryArray);
      } else if (q.match(/^(h|help)$/)) {
        this.addHelp(query, queryArray);
      } else {
        let error;

        try {
          eval(query);
        } catch (err) {
          error = err;
        }

        if (error) {
          this.addOutput(
            <span>
              Input <kbd className="user">{query}</kbd> not recognized. Please
              type <kbd>help</kbd> for a list of commands.
            </span>
          );
        } else {
          this.addOutput(
            <span>
              {query} = <strong>{eval(query)}</strong>
            </span>
          );
        }
      }
    }
  }

  render() {
    const { query, output } = this.state;

    return [
      <ul>
        {output.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ul>,
      <form onSubmit={this.submitQuery} className="group">
        <input
          type="text"
          placeholder="Input query here"
          value={query}
          onChange={this.changeQuery}
          onKeyDown={this.keypressQuery}
          autoFocus={true}
        />
        <button type="submit" className="primary">
          Submit
        </button>
      </form>
    ];
  }
}

export default Robot;
