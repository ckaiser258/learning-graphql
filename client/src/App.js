import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

//apollo client setup
const client = new ApolloClient({
  //uri is where we will make queries to
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    //wrap app in ApolloProvider and set the client
    //this allows us to take the data coming from the endpoint and inject it into the app
    <ApolloProvider client={client}>
      <div className="main">
        <h1>Colton's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
