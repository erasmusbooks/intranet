import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import IsbnElement from "./IsbnElement";
import PurchaseElement from "./PurchaseElement";
import SaleElement from "./SaleElement";

const AntiquarianQuote = ({
  author,
  title,
  ean,
  url,
  condition,
  description,
  amount,
  shipping,
  currency,
  sale,
  discount
}) => {
  const copyToClipboard = () => {
    const emailStyle = {
      fontFamily: "Calibri, Arial, sans-serif",
      fontSize: "110%"
    };

    const copyTable = (
      <table style={{ ...emailStyle, marginLeft: "1em" }}>
        <tr>
          <td>Quantity:</td>
          <td>1</td>
        </tr>
        <tr>
          <td>Author(s):</td>
          <td>{author || "Unknown"}</td>
        </tr>
        <tr>
          <td>Title:</td>
          <td>
            <strong>{title || "Unknown"}</strong>
          </td>
        </tr>
        <tr>
          <td>ISBN:</td>
          <td>
            <IsbnElement ean={ean} />
          </td>
        </tr>
        <tr>
          <td>URL:</td>
          <td>
            {url.length ? (
              <a href={url} target="_blank">
                {url}
              </a>
            ) : (
              "Unknown"
            )}
          </td>
        </tr>
        <tr>
          <td>Condition:</td>
          <td>
            {condition} {description && `(${description})`}
          </td>
        </tr>
        <tr>
          <td>Purchase:</td>
          <td>
            <PurchaseElement
              amount={amount}
              shipping={shipping}
              currency={currency}
            />
          </td>
        </tr>
        <tr>
          <td style={{ paddingRight: "2em" }}>Customer price:</td>
          <td>
            <SaleElement sale={sale} discount={discount} />
          </td>
        </tr>
      </table>
    );

    const emailMarkup = (
      <span>
        <p style={emailStyle}>(Antiq: XXXXXX, Customer: XXXXXX)</p>
        <p style={emailStyle}>XXXXXX,</p>
        {copyTable}
        <p style={emailStyle}>Ben</p>
      </span>
    );

    console.log(renderToStaticMarkup(emailMarkup));

    let container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(emailMarkup);

    container.style.position = "fixed";
    container.style.pointerEvents = "none";
    container.style.opacity = 0;

    let activeSheets = Array.prototype.slice
      .call(document.styleSheets)
      .filter(function(sheet) {
        return !sheet.disabled;
      });

    document.body.appendChild(container);
    window.getSelection().removeAllRanges();

    let range = document.createRange();
    range.selectNode(container);
    window.getSelection().addRange(range);

    document.execCommand("copy");
    for (let i = 0; i < activeSheets.length; i++)
      activeSheets[i].disabled = true;

    document.execCommand("copy");
    for (let i = 0; i < activeSheets.length; i++)
      activeSheets[i].disabled = false;

    document.body.removeChild(container);
  };

  return [
    <blockquote className="antiq-quote">
      <table id="antiq-output">
        <tr>
          <td width="35%">Quantity:</td>
          <td>1</td>
        </tr>
        <tr>
          <td>Author(s):</td>
          <td>{author || "Unknown"}</td>
        </tr>
        <tr>
          <td>Title:</td>
          <td>
            <strong>{title || "Unknown"}</strong>
          </td>
        </tr>
        <tr>
          <td>ISBN:</td>
          <td>
            <IsbnElement ean={ean} />
          </td>
        </tr>
        <tr>
          <td>URL:</td>
          <td>
            {url.length ? (
              <a href={url} target="_blank">
                {url}
              </a>
            ) : (
              "Unknown"
            )}
          </td>
        </tr>
        <tr>
          <td>Condition:</td>
          <td>
            {condition} {description && `(${description})`}
          </td>
        </tr>
        <tr>
          <td>Purchase:</td>
          <td>
            <PurchaseElement
              amount={amount}
              shipping={shipping}
              currency={currency}
            />
          </td>
        </tr>
        <tr>
          <td>Customer price:</td>
          <td>
            <SaleElement sale={sale} discount={discount} />
          </td>
        </tr>
      </table>
    </blockquote>,
    <button className="primary" onClick={copyToClipboard}>
      Copy to clipboard
    </button>
  ];
};

export default AntiquarianQuote;
