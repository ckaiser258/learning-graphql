const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

//dummy data
var books = [
  {
    name: "Name of the Wind",
    genre: "Fantasy",
    id: "1",
    authorId: "1",
  },
  {
    name: "The Final Empire",
    genre: "Sci-Fi",
    id: "2",
    authorId: "2",
  },
];
var authors = [
  {
    name: "Patrick Rothfuss",
    age: 44,
    id: "1",
  },
  {
    name: "Brandon Sanderson",
    age: 42,
    id: "2",
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    //The GraphQLID type will coerce a number to a string.
    //It allows for you to pass a string OR a number as the id.
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      //parent refers to the book in this case
      resolve(parent, args) {
        console.log(parent); //Logs the book object
        return authors.find((author) => author.id === parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    //The GraphQLID type will coerce a number to a string.
    //It allows for you to pass a string OR a number as the id.
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
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
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/other source
        return books.find((book) => args.id === book.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find((author) => args.id === author.id);
      },
    },
  },
});

//Export the query of this schema to use in graphqlHTTP() in app.js
module.exports = new GraphQLSchema({
  query: RootQuery,
});
