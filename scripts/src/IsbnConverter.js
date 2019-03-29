import React, { Component } from "react";
import isbn from "isbn-utils";

import IsbnConverterTable from "./IsbnConverterTable.js";

class IsbnConverter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            isValid: true,
            isbnTable: [
                { prefix: "0", group: "English", type: "Language" },
                { prefix: "1", group: "English", type: "Language" },
                { prefix: "2", group: "French", type: "Language" },
                { prefix: "3", group: "German", type: "Language" },
                { prefix: "4", group: "Japan", type: "National" },
                {
                    prefix: "5",
                    group: "Russia and former USSR",
                    type: "National"
                },
                { prefix: "600", group: "Iran", type: "National" },
                { prefix: "601", group: "Kazakhstan", type: "National" },
                { prefix: "602", group: "Indonesia", type: "National" },
                { prefix: "603", group: "Saudi Arabia", type: "National" },
                { prefix: "604", group: "Vietnam", type: "National" },
                { prefix: "605", group: "Turkey", type: "National" },
                { prefix: "606", group: "Romania", type: "National" },
                { prefix: "607", group: "Mexico", type: "National" },
                { prefix: "608", group: "Macedonia", type: "National" },
                { prefix: "609", group: "Lithuania", type: "National" },
                { prefix: "611", group: "Thailand", type: "National" },
                { prefix: "612", group: "Peru", type: "National" },
                { prefix: "613", group: "Mauritius", type: "National" },
                { prefix: "614", group: "Lebanon", type: "National" },
                { prefix: "615", group: "Hungary", type: "National" },
                { prefix: "616", group: "Thailand", type: "National" },
                { prefix: "617", group: "Ukraine", type: "National" },
                { prefix: "618", group: "Greece", type: "National" },
                { prefix: "619", group: "Bulgaria", type: "National" },
                { prefix: "620", group: "Mauritius", type: "National" },
                { prefix: "7", group: "China", type: "National" },
                {
                    prefix: "80",
                    group: "Czech Republic and Slovakia",
                    type: "National"
                },
                { prefix: "81", group: "India", type: "National" },
                { prefix: "82", group: "Norway", type: "National" },
                { prefix: "83", group: "Poland", type: "National" },
                { prefix: "84", group: "Spain", type: "National" },
                { prefix: "85", group: "Brazil", type: "National" },
                {
                    prefix: "86",
                    group: "Serbia and Montenegro",
                    type: "National"
                },
                { prefix: "87", group: "Denmark", type: "National" },
                { prefix: "88", group: "Italy", type: "National" },
                { prefix: "89", group: "Korea", type: "National" },
                { prefix: "90", group: "Netherlands", type: "National" },
                { prefix: "91", group: "Sweden", type: "National" },
                { prefix: "92", group: "NGOs  N/", type: "A" },
                { prefix: "93", group: "India", type: "National" },
                { prefix: "94", group: "Netherlands", type: "National" },
                { prefix: "950", group: "Argentina", type: "National" },
                { prefix: "951", group: "Finland", type: "National" },
                { prefix: "952", group: "Finland", type: "National" },
                { prefix: "953", group: "Croatia", type: "National" },
                { prefix: "954", group: "Bulgaria", type: "National" },
                { prefix: "955", group: "Sri Lanka", type: "National" },
                { prefix: "956", group: "Chile", type: "National" },
                { prefix: "957", group: "Taiwan", type: "National" },
                { prefix: "958", group: "Colombia", type: "National" },
                { prefix: "959", group: "Cuba", type: "National" },
                { prefix: "960", group: "Greece", type: "National" },
                { prefix: "961", group: "Slovenia", type: "National" },
                { prefix: "962", group: "Hong Kong", type: "National" },
                { prefix: "963", group: "Hungary", type: "National" },
                { prefix: "964", group: "Iran", type: "National" },
                { prefix: "965", group: "Israel", type: "National" },
                { prefix: "966", group: "Ukraine", type: "National" },
                { prefix: "967", group: "Malaysia", type: "National" },
                { prefix: "968", group: "Mexico", type: "National" },
                { prefix: "969", group: "Pakistan", type: "National" },
                { prefix: "970", group: "Mexico", type: "National" },
                { prefix: "971", group: "Philippines", type: "National" },
                { prefix: "972", group: "Portugal", type: "National" },
                { prefix: "973", group: "Romania", type: "National" },
                { prefix: "974", group: "Thailand", type: "National" },
                { prefix: "975", group: "Turkey", type: "National" },
                { prefix: "976", group: "CARICOM", type: "National" },
                { prefix: "977", group: "Egypt", type: "National" },
                { prefix: "978", group: "Nigeria", type: "National" },
                { prefix: "979", group: "Indonesia", type: "National" },
                { prefix: "980", group: "Venezuela", type: "National" },
                { prefix: "981", group: "Singapore", type: "National" },
                { prefix: "982", group: "South Pacific", type: "National" },
                { prefix: "983", group: "Malaysia", type: "National" },
                { prefix: "984", group: "Bangladesh", type: "National" },
                { prefix: "985", group: "Belarus", type: "National" },
                { prefix: "986", group: "Taiwan", type: "National" },
                { prefix: "987", group: "Argentina", type: "National" },
                { prefix: "988", group: "Hong Kong", type: "National" },
                { prefix: "989", group: "Portugal", type: "National" },
                { prefix: "9927", group: "Qatar", type: "National" },
                { prefix: "9928", group: "Albania", type: "National" },
                { prefix: "9929", group: "Guatemala", type: "National" },
                { prefix: "9930", group: "Costa Rica", type: "National" },
                { prefix: "9931", group: "Algeria", type: "National" },
                { prefix: "9932", group: "Laos", type: "National" },
                { prefix: "9933", group: "Syria", type: "National" },
                { prefix: "9934", group: "Latvia", type: "National" },
                { prefix: "9935", group: "Iceland", type: "National" },
                { prefix: "9936", group: "Afghanistan", type: "National" },
                { prefix: "9937", group: "Nepal", type: "National" },
                { prefix: "9939", group: "Armenia", type: "National" },
                { prefix: "9940", group: "Montenegro", type: "National" },
                { prefix: "9941", group: "Georgia", type: "National" },
                { prefix: "9942", group: "Ecuador", type: "National" },
                { prefix: "9943", group: "Uzbekistan", type: "National" },
                { prefix: "9944", group: "Turkey", type: "National" },
                {
                    prefix: "9945",
                    group: "Dominican Republic",
                    type: "National"
                },
                { prefix: "9946", group: "North Korea", type: "National" },
                { prefix: "9947", group: "Algeria", type: "National" },
                {
                    prefix: "9948",
                    group: "United Arab Emirates",
                    type: "National"
                },
                { prefix: "9949", group: "Estonia", type: "National" },
                { prefix: "9950", group: "Palestine", type: "National" },
                { prefix: "9951", group: "Kosovo", type: "National" },
                { prefix: "9952", group: "Azerbaijan", type: "National" },
                { prefix: "9953", group: "Lebanon", type: "National" },
                { prefix: "9954", group: "Morocco", type: "National" },
                { prefix: "9955", group: "Lithuania", type: "National" },
                { prefix: "9956", group: "Cameroon", type: "National" },
                { prefix: "9957", group: "Jordan", type: "National" },
                {
                    prefix: "9958",
                    group: "Bosnia and Herzegovina",
                    type: "National"
                },
                { prefix: "9959", group: "Libya", type: "National" },
                { prefix: "9960", group: "Saudi Arabia", type: "National" },
                { prefix: "9961", group: "Algeria", type: "National" },
                { prefix: "9962", group: "Panama", type: "National" },
                { prefix: "9963", group: "Cyprus", type: "National" },
                { prefix: "9964", group: "Ghana", type: "National" },
                { prefix: "9965", group: "Kazakhstan", type: "National" },
                { prefix: "9966", group: "Kenya", type: "National" },
                { prefix: "9967", group: "Kyrgyzstan", type: "National" },
                { prefix: "9968", group: "Costa Rica", type: "National" },
                { prefix: "9970", group: "Uganda", type: "National" },
                { prefix: "9971", group: "Singapore", type: "National" },
                { prefix: "9972", group: "Peru", type: "National" },
                { prefix: "9973", group: "Tunisia", type: "National" },
                { prefix: "9974", group: "Uruguay", type: "National" },
                { prefix: "9975", group: "Moldova", type: "National" },
                { prefix: "9976", group: "Tanzania", type: "National" },
                { prefix: "9977", group: "Costa Rica", type: "National" },
                { prefix: "9978", group: "Ecuador", type: "National" },
                { prefix: "9979", group: "Iceland", type: "National" },
                { prefix: "9980", group: "Papua New Guinea", type: "National" },
                { prefix: "9981", group: "Morocco", type: "National" },
                { prefix: "9982", group: "Zambia", type: "National" },
                { prefix: "9983", group: "Gambia", type: "National" },
                { prefix: "9984", group: "Latvia", type: "National" },
                { prefix: "9985", group: "Estonia", type: "National" },
                { prefix: "9986", group: "Lithuania", type: "National" },
                { prefix: "9987", group: "Tanzania", type: "National" },
                { prefix: "9988", group: "Ghana", type: "National" },
                { prefix: "9989", group: "Macedonia", type: "National" },
                { prefix: "99901", group: "Bahrain", type: "National" },
                { prefix: "99902", group: "Gabon", type: "National" },
                { prefix: "99903", group: "Mauritius", type: "National" },
                {
                    prefix: "99904",
                    group: "Netherland Antilles",
                    type: "National"
                },
                { prefix: "99905", group: "Bolivia", type: "National" },
                { prefix: "99906", group: "Kuwait", type: "National" },
                { prefix: "99908", group: "Malawi", type: "National" },
                { prefix: "99909", group: "Malta", type: "National" },
                { prefix: "99910", group: "Sierra Leone", type: "National" },
                { prefix: "99911", group: "Lesotho", type: "National" },
                { prefix: "99912", group: "Botsana", type: "National" },
                { prefix: "99913", group: "Andorra", type: "National" },
                { prefix: "99914", group: "Suriname", type: "National" },
                { prefix: "99915", group: "Maldives", type: "National" },
                { prefix: "99916", group: "Namibia", type: "National" },
                { prefix: "99917", group: "Brunei", type: "National" },
                { prefix: "99918", group: "Faroe Islands", type: "National" },
                { prefix: "99919", group: "Benin", type: "National" },
                { prefix: "99920", group: "Andorra", type: "National" },
                { prefix: "99921", group: "Qatar", type: "National" },
                { prefix: "99922", group: "Guatemala", type: "National" },
                { prefix: "99923", group: "El Salvador", type: "National" },
                { prefix: "99924", group: "Nicaragua", type: "National" },
                { prefix: "99925", group: "Paraguay", type: "National" },
                { prefix: "99926", group: "Honduras", type: "National" },
                { prefix: "99927", group: "Albania", type: "National" },
                { prefix: "99928", group: "Georgia", type: "National" },
                { prefix: "99929", group: "Honduras", type: "National" },
                { prefix: "99930", group: "Armenia", type: "National" },
                { prefix: "99931", group: "Seychelles", type: "National" },
                { prefix: "99932", group: "Malta", type: "National" },
                { prefix: "99933", group: "Nepal", type: "National" },
                {
                    prefix: "99934",
                    group: "Dominican republic",
                    type: "National"
                },
                { prefix: "99935", group: "Haiti", type: "National" },
                { prefix: "99936", group: "Bhutan", type: "National" },
                { prefix: "99937", group: "Serbia", type: "National" },
                { prefix: "99938", group: "Macau", type: "National" },
                { prefix: "99939", group: "Guatemala", type: "National" },
                { prefix: "99941", group: "Armenia", type: "National" },
                { prefix: "99942", group: "Sudan", type: "National" },
                { prefix: "99943", group: "Albania", type: "National" },
                { prefix: "99944", group: "Ethiopia", type: "National" },
                { prefix: "99945", group: "Namibia", type: "National" },
                { prefix: "99946", group: "Nepal", type: "National" },
                { prefix: "99947", group: "Tajikistan", type: "National" },
                { prefix: "99948", group: "Eritrea", type: "National" },
                { prefix: "99949", group: "Mauritius", type: "National" },
                { prefix: "99950", group: "Cambodia", type: "National" },
                {
                    prefix: "99951",
                    group: "Democratic Congo",
                    type: "National"
                },
                { prefix: "99952", group: "Mali", type: "National" },
                { prefix: "99953", group: "Paraguay", type: "National" },
                { prefix: "99954", group: "Bolivia", type: "National" },
                { prefix: "99955", group: "Serbia", type: "National" },
                { prefix: "99956", group: "Albania", type: "National" },
                { prefix: "99957", group: "Malta", type: "National" },
                { prefix: "99958", group: "Bahrain", type: "National" },
                { prefix: "99959", group: "Luxembourg", type: "National" },
                { prefix: "99960", group: "Malawi", type: "National" },
                { prefix: "99961", group: "El Salvador", type: "National" },
                { prefix: "99962", group: "Mongolia", type: "National" },
                { prefix: "99963", group: "Cambodia", type: "National" },
                { prefix: "99964", group: "Nicaragua", type: "National" },
                { prefix: "99965", group: "Macau", type: "National" },
                { prefix: "99966", group: "Kuwait", type: "National" },
                { prefix: "99967", group: "Paraguay", type: "National" },
                { prefix: "99968", group: "Botswana", type: "National" },
                { prefix: "99969", group: "Oman", type: "National" }
            ]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { value } = e.target;

        this.setState({
            input: value,
            isValid:
                isbn.parse(value) != null && isbn.parse(value).codes.isValid
        });
    }

    render() {
        const { input, isbnTable, isValid } = this.state,
            prefix = input && isValid && isbn.parse(input).codes.group;

        return (
            <div>
                <div className="left">
                    <div className="group">
                        <input
                            type="text"
                            value={input}
                            onChange={this.handleChange}
                            className={isValid ? "" : "invalid"}
                            placeholder="9780123456789"
                            autoFocus
                        />
                        <button className="primary">Convert</button>
                    </div>

                    <IsbnConverterTable source={input} />
                </div>

                <table id="prefix-table" className="bordered dense">
                    <thead>
                        <tr>
                            <th width="1%">Prefix</th>
                            <th>Group</th>
                            <th width="1%">Type</th>
                            <th width="1%">Prefix</th>
                            <th>Group</th>
                            <th width="1%">Type</th>
                            <th width="1%">Prefix</th>
                            <th>Group</th>
                            <th width="1%">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isbnTable.map((row, i, arr) => {
                            const boom = Math.ceil(arr.length / 3);
                            if (i < boom) {
                                return (
                                    <tr>
                                        <td
                                            className={
                                                row.prefix === prefix &&
                                                "active"
                                            }
                                        >
                                            {row.prefix}
                                        </td>
                                        <td
                                            className={
                                                row.prefix === prefix &&
                                                "active"
                                            }
                                        >
                                            {row.group}
                                        </td>
                                        <td
                                            className={
                                                row.prefix === prefix &&
                                                "active"
                                            }
                                        >
                                            {row.type}
                                        </td>
                                        <td
                                            className={
                                                arr[boom + i].prefix ===
                                                    prefix && "active"
                                            }
                                        >
                                            {arr[boom + i].prefix}
                                        </td>
                                        <td
                                            className={
                                                arr[boom + i].prefix ===
                                                    prefix && "active"
                                            }
                                        >
                                            {arr[boom + i].group}
                                        </td>
                                        <td
                                            className={
                                                arr[boom + i].prefix ===
                                                    prefix && "active"
                                            }
                                        >
                                            {arr[boom + i].type}
                                        </td>
                                        <td
                                            className={
                                                arr[boom * 2 + i].prefix ===
                                                    prefix && "active"
                                            }
                                        >
                                            {arr[boom * 2 + i].prefix}
                                        </td>
                                        <td
                                            className={
                                                arr[boom * 2 + i].prefix ===
                                                    prefix && "active"
                                            }
                                        >
                                            {arr[boom * 2 + i].group}
                                        </td>
                                        <td
                                            className={
                                                arr[boom * 2 + i].prefix ===
                                                    prefix && "active"
                                            }
                                        >
                                            {arr[boom * 2 + i].type}
                                        </td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default IsbnConverter;
