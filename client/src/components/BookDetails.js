import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

function BookDetails(props) {
  //remember, props also includes all the data from getBookQuery since we've set that up below

  const displayBookDetails = () => {
    const { book } = props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    }
    return <div>No book selected...</div>;
  };

  return <div id="book-details">{displayBookDetails()}</div>;
}

export default graphql(getBookQuery, {
  //setting up getBookQuery
  options: (props) => {
    //any time props is received, run this options function
    return {
      //we've set up $id in queries.js as the variable that needs to be passed into the getBookQuery function
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
