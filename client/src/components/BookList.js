import React from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

function BookList(props) {
  const displayBooks = () => {
    let data = props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map((book) => <li key={book.id}>{book.name}</li>);
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  );
}

//bind getBooksQuery to BookList so we can access the data from the query inside BookList
//this data is now stored in BookList's props
export default graphql(getBooksQuery)(BookList);
