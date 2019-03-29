import React from "react";

const SearchTable = ({ books }) => (
  <table className="bordered dense search-table">
    {books.map((book, i) => {
      const b = book.volumeInfo;

      let authors = "";
      if (b.authors) {
        b.authors.forEach((a, i) => {
          if (i == 0) {
            authors = authors + a;
          } else {
            authors = authors + "; " + a;
          }
        });
      } else {
        authors = "Author unknown";
      }

      let isbNumber;
      if (b.industryIdentifiers) {
        b.industryIdentifiers.forEach(i => {
          if (i.identifier.length == 13) {
            isbNumber = i.identifier;
          }
        });
      } else {
        isbNumber = "ISBN unknown";
      }

      return (
        <tr key={i}>
          <td width="15%">
            <img src={b.imageLinks.smallThumbnail} />
          </td>
          <td>
            <em>{authors}</em>
            <h3>
              {b.title} <small>{b.subtitle || ""}</small>
            </h3>
            {isbNumber || "ISBN unknown"} - {b.publisher || "Publisher unknown"}{" "}
            - {b.publishedDate || "Date unknown"}
            <br />
            {b.description
              ? b.description.substring(0, 300) + "..."
              : "No description"}
          </td>
        </tr>
      );
    })}
  </table>
);

export default SearchTable;
