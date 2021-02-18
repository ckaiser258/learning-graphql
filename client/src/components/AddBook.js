import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";

function AddBook(props) {
  const displayAuthors = () => {
    let data = props.data;
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

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>

      <div className="field">
        <select>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

//bind getAuthorsQuery to AddBook so we can access the data from the query inside AddBook
//this data is now stored in AddBook's props
export default graphql(getAuthorsQuery)(AddBook);
