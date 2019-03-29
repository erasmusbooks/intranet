import React, { Component } from "react";

class SplitVat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      net: "",
      vat: "",
      high: 21,
      low: 9
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { id, value } = e.target,
      obj = {};
    obj[id] = value;

    this.setState(obj);
  }

  render() {
    const { net, vat, high, low } = this.state;

    const cH = high / 100,
      cL = low / 100;

    const lowNet =
        Boolean(net) && Boolean(vat)
          ? ((vat - cH * net) / (cL - cH)).toFixed(2)
          : "",
      lowVat = Boolean(lowNet) ? (cL * lowNet).toFixed(2) : "",
      lowGross = Boolean(lowVat) ? (lowNet - lowVat).toFixed(2) : "",
      highNet = Boolean(lowVat) ? (net - lowNet).toFixed(2) : "",
      highVat = Boolean(highNet) ? (highNet * cH).toFixed(2) : "",
      highGross = Boolean(highVat) ? (highNet - highVat).toFixed(2) : "",
      totalNet =
        Boolean(highNet) && Boolean(lowNet)
          ? (parseFloat(highNet) + parseFloat(lowNet)).toFixed(2)
          : "",
      totalVat =
        Boolean(highVat) && Boolean(lowVat)
          ? (parseFloat(highVat) + parseFloat(lowVat)).toFixed(2)
          : "",
      totalGross =
        Boolean(totalNet) && Boolean(totalVat)
          ? (parseFloat(totalNet) - parseFloat(totalVat)).toFixed(2)
          : "";

    return (
      <div>
        <div className="basic-form">
          <label htmlFor="net">Net amount</label>
          <input
            type="number"
            step=".01"
            value={net}
            id="net"
            onChange={this.handleChange}
            autoFocus
          />

          <label htmlFor="vat">Total VAT</label>
          <input
            type="number"
            step=".01"
            value={vat}
            id="vat"
            onChange={this.handleChange}
          />

          <label htmlFor="high">High VAT</label>
          <div className="group">
            <input
              type="number"
              step=".01"
              value={high}
              id="high"
              onChange={this.handleChange}
            />
            <label>%</label>
          </div>

          <label htmlFor="low">Low VAT</label>
          <div className="group">
            <input
              type="number"
              step=".01"
              value={low}
              id="low"
              onChange={this.handleChange}
            />
            <label>%</label>
          </div>
        </div>

        <table className="bordered">
          <thead>
            <tr>
              <th />
              <th>Net</th>
              <th>Gross</th>
              <th>VAT</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>High ({high}%)</td>
              <td className={highNet < 0 && "error"}>{highNet}</td>
              <td className={highNet < 0 && "error"}>{highGross}</td>
              <td className={highVat < 0 && "error"}>{highVat}</td>
            </tr>
            <tr>
              <td>Low ({low}%)</td>
              <td className={lowNet < 0 && "error"}>{lowNet}</td>
              <td className={lowNet < 0 && "error"}>{lowGross}</td>
              <td className={lowVat < 0 && "error"}>{lowVat}</td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{totalNet}</strong>
              </td>
              <td>
                <strong>{totalGross}</strong>
              </td>
              <td>
                <strong>{totalVat}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default SplitVat;
