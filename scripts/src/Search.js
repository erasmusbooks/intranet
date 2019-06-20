import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <form className="group" role="search">
        <svg className="icon">
          <use xlinkHref={templateUrl + "/icons/icons.svg#search"} />
        </svg>
        <input type="search" className="prepend-icon" placeholder="Search..." />
      </form>
    );
  }
}

export default Search;
