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
  discount,
  clearForm
}) => {
  const copyToClipboard = () => {
    const emailStyle = {
      fontFamily: "Calibri, Arial, sans-serif",
      fontSize: "100%"
    };

    const verAlign = { verticalAlign: "top" };

    const copyTable = (
      <table style={{ ...emailStyle, marginLeft: "1em" }}>
        <tr>
          <td style={verAlign}>Quantity:</td>
          <td style={verAlign}>1</td>
        </tr>
        <tr>
          <td style={verAlign}>Author(s):</td>
          <td style={verAlign}>{author || "Unknown"}</td>
        </tr>
        <tr>
          <td style={{ width: "150px" }}>Title:</td>
          <td style={verAlign}>
            <strong>{title || "Unknown"}</strong>
          </td>
        </tr>
        <tr>
          <td style={verAlign}>ISBN:</td>
          <td style={verAlign}>
            <IsbnElement ean={ean} />
          </td>
        </tr>
        <tr>
          <td style={verAlign}>URL:</td>
          <td style={verAlign}>
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
          <td style={verAlign}>Condition:</td>
          <td style={verAlign}>
            {condition} {description && `(${description})`}
          </td>
        </tr>
        <tr>
          <td style={verAlign}>Purchase:</td>
          <td style={verAlign}>
            <PurchaseElement
              amount={amount}
              shipping={shipping}
              currency={currency}
            />
          </td>
        </tr>
        <tr>
          <td style={verAlign}>Customer price:</td>
          <td style={verAlign}>
            <SaleElement sale={sale} discount={discount} />
          </td>
        </tr>
      </table>
    );

    const emailMarkup = (
      <span style={emailStyle}>
        (Antiq: XXXXXX, Customer: XXXXXX)
        <br />
        <br />
        XXXXXX,
        <br />
        <br />
        {copyTable}
        <br />
        Ben
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
    <button
      className="primary"
      onClick={copyToClipboard}
      style={{ float: "right", marginRight: 0 }}
    >
      Copy to clipboard
    </button>,
    <button onClick={clearForm}>Clear form</button>,
    <blockquote className="antiq-quote">
      <table id="antiq-output">
        <tr>
          <td width="35%">Quantity:</td>
          <td style={{ verticalAlign: "top" }}>1</td>
        </tr>
        <tr>
          <td style={{ verticalAlign: "top" }}>Author(s):</td>
          <td style={{ verticalAlign: "top" }}>{author || "Unknown"}</td>
        </tr>
        <tr>
          <td style={{ verticalAlign: "top" }}>Title:</td>
          <td style={{ verticalAlign: "top" }}>
            <strong>{title || "Unknown"}</strong>
          </td>
        </tr>
        <tr>
          <td style={{ verticalAlign: "top" }}>ISBN:</td>
          <td style={{ verticalAlign: "top" }}>
            <IsbnElement ean={ean} />
          </td>
        </tr>
        <tr>
          <td style={{ verticalAlign: "top" }}>URL:</td>
          <td style={{ verticalAlign: "top" }}>
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
          <td style={{ verticalAlign: "top" }}>Condition:</td>
          <td style={{ verticalAlign: "top" }}>
            {condition} {description && `(${description})`}
          </td>
        </tr>
        <tr>
          <td style={{ verticalAlign: "top" }}>Purchase:</td>
          <td style={{ verticalAlign: "top" }}>
            <PurchaseElement
              amount={amount}
              shipping={shipping}
              currency={currency}
            />
          </td>
        </tr>
        <tr>
          <td style={{ verticalAlign: "top" }}>Customer price:</td>
          <td style={{ verticalAlign: "top" }}>
            <SaleElement sale={sale} discount={discount} />
          </td>
        </tr>
      </table>
    </blockquote>
  ];
};

export default AntiquarianQuote;
