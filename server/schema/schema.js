const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
var books = [
  {
    name: "Name of the Wind",
    genre: "Fantasy",
    id: "1",
  },
  {
    name: "The Final Empire",
    genre: "Sci-Fi",
    id: "2",
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

//Define the root query which is how you will initially jump into the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      //args are what the user will need to pass in when making the call
      //in this case they will need to specify an id in the query
      //ex: book(id: '123'){
      //      name
      //      genre
      //    }
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //code to get data from db/other source
        return books.find((book) => args.id === book.id);
      },
    },
  },
});

//Export the query of this schema to use in graphqlHTTP() in app.js
module.exports = new GraphQLSchema({
  query: RootQuery,
});
