import { useState } from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery, addBookMutation } from "../queries/queries";
import flowright from "lodash.flowright";

const compose = flowright;

function AddBook(props) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  console.log(name, genre, authorId);

  const displayAuthors = () => {
    let data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    }
    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.addBookMutation({
      //since we set the query variables in queries.js as $name, $genre, and $authorId
      //we use them as the variables passed into the mutation here
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

//bind getAuthorsQuery and addBookMutation to AddBook so we can access the data from the query inside AddBook
//this data is now stored in AddBook's props
export default compose(
  //name is what you want the name of the function to be used as in the code
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
