import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

function BookList(props) {
  console.log(props);
  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
      </ul>
    </div>
  );
}

//bind getBooksQuery to BookList so we can access the data from the query inside BookList
//this data is now stored in BookList's props
export default graphql(getBooksQuery)(BookList);
