import React from "react";
import isbn from "isbn-utils";

const IsbnConverterTable = ({ source }) => {
  const isValid =
      isbn.parse(source) != null && isbn.parse(source).codes.isValid,
    { codes } = isValid && isbn.parse(source);

  return (
    <table className="isbn-table bordered dense">
      <tbody>
        <tr>
          <td width="1%">Source</td>
          <td className={!isValid && "error"}>{source && `"${source}"`}</td>
        </tr>
        <tr>
          <td>ISBN10:</td>
          <td>{isValid && codes.isbn10}</td>
        </tr>
        <tr>
          <td>ISBN10-:</td>
          <td>{isValid && codes.isbn10h}</td>
        </tr>
        <tr>
          <td>ISBN13:</td>
          <td>{isValid && codes.isbn13}</td>
        </tr>
        <tr>
          <td>ISBN13-:</td>
          <td>{isValid && codes.isbn13h}</td>
        </tr>
        <tr>
          <td>Group:</td>
          <td>
            {isValid && codes.group && `${codes.groupname} (${codes.group})`}
          </td>
        </tr>
        <tr>
          <td>Publisher:</td>
          <td>{isValid && codes.publisher}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default IsbnConverterTable;
