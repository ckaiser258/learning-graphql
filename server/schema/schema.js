const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  //fields always needs to be a function since this object won't know what
  //AuthorType is until later on in the file
  //Changing the order of things won't make a difference since things refer to each other
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
        // return authors.find((author) => author.id === parent.authorId);
        return Author.findById(parent.authorId);
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
    books: {
      //GraphQLList(BookType) will return a list of BookTypes
      //Since authors can have more than one book, we can't just put BookType (which only returns one book)
      type: new GraphQLList(BookType),
      //Parent refers to Author in this case
      resolve(parent, args) {
        // return books.filter((book) => book.authorId === parent.id);
        return Book.find({ authorId: parent.id });
      },
    },
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
        // return books.find((book) => args.id === book.id);
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return authors.find((author) => args.id === author.id);
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        //Will return all books since an empty object has been passed in
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      //args is what the user needs to pass as arguments from the front end to add an author
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        //use mongoose to save the new author to the database (.save() comes from mongoose which
        //saves the object to the database and returns it)
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        //GraphQLNonNull makes things required
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

//Export the query and mutation of this schema to use in graphqlHTTP() in app.js
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
