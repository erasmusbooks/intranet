import React from "react";

const HelpTable = () => (
  <table className="bordered dense">
    <thead>
      <tr>
        <th>Function</th>
        <th>Description</th>
        <th>Command(s)</th>
        <th>Examples</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Currency converter</td>
        <td>
          The <strong>Currency converter</strong> prints a list of our most used
          currencies and it's conversions or converts two specific currencies.
          The results also includes 20%, 30% and 40% margins, which can be
          useful with pricing. The convertor accepts most major{" "}
          <a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank">
            ISO 4217 currency codes
          </a>{" "}
          and conversions are based on most recent available{" "}
          <a
            href="http://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html"
            target="_blank"
          >
            ECB rates
          </a>
          .
        </td>
        <td>
          <em>currency, curr, c, ph, price</em>
        </td>
        <td width="20%">
          <kbd>currency 12 eur</kbd>
          <br />
          <kbd>curr 39.95 usd</kbd>
          <br />
          <kbd>c gbp 24.50 eur</kbd>
        </td>
      </tr>

      <tr>
        <td>VAT calculation</td>
        <td>
          If you are wondering what an amount would look like including or
          excluding a certain percentage, use the{" "}
          <strong>VAT calculator</strong>.
        </td>
        <td>
          <em>vat, btw, mwst, tva</em>
        </td>
        <td>
          <kbd>vat 130</kbd>
          <br />
          <kbd>btw 19.75</kbd>
        </td>
      </tr>

      <tr>
        <td>ISBN converter</td>
        <td>
          If you ever had the need to convert, hyphenate or breakdown an ISBN,
          the <strong>ISBN converter</strong> is your friend. It accepts any
          type of ISBN and prints out a list of all its constiations and parts
        </td>
        <td>
          <em>isbn, i</em>
        </td>
        <td>
          <kbd>isbn 978-3-16-148410-0</kbd>
          <br />
          <kbd>i 316148410X</kbd>
        </td>
      </tr>

      <tr>
        <td>Book search</td>
        <td>
          Looking for a book? Robot can help you search with a simple{" "}
          <strong>Book search</strong>. Just enter any search criteria and it
          will print a list of the top three search results, using the{" "}
          <a href="https://books.google.com" target="_blank">
            Google Books API
          </a>
          .
        </td>
        <td>
          <em>search, s, query, q</em>
        </td>
        <td>
          <kbd>search ulysses joyce</kbd>
          <br />
          <kbd>s grapes wrath steinbeck</kbd>
          <br />
          <kbd>q 9780679732266</kbd>
        </td>
      </tr>

      <tr>
        <td>Antiquarian quote</td>
        <td>
          Do you have to quote an antiquarian book to a customer? This tool
          converts the purchase and shipping amounts from any currency and
          calculates the customer price. It is also able to fetch bibliographic
          records if you provide a valid ISBN. Results are easily copied to
          clipboard with the press of a button, to be pasted into an e-mail.
        </td>
        <td>
          <em>antiq, a</em>
        </td>
        <td>
          <kbd>antiq 12 eur</kbd>
          <br />
          <kbd>a 34.95 2.80 gbp</kbd>
          <br />
          <kbd>a 108 0 9780679732266</kbd>
          <br />
          <kbd>a 450 50 SGD 1982925426</kbd>
        </td>
      </tr>

      <tr>
        <td>Calculation</td>
        <td>
          Robot will do simple <strong>Calculation</strong>, no big deal.
        </td>
        <td />
        <td>
          <kbd>2 * 8 - 3</kbd>
          <br />
          <kbd>(49 / 7) + 24</kbd>
        </td>
      </tr>

      <tr>
        <td colspan="4" style={{ textAlign: "right " }}>
          <small>
            If you have questions, comments or suggestions, please let me know
            at <a href="mailto:ben@erasmusbooks.nl">ben@erasmusbooks.nl</a>
          </small>
        </td>
      </tr>
    </tbody>
  </table>
);

export default HelpTable;
