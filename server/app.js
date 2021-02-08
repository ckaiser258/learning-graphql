const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

const app = express();

const uri =
  "mongodb://user:12345@cluster0-shard-00-00.uwgnz.mongodb.net:27017,cluster0-shard-00-01.uwgnz.mongodb.net:27017,cluster0-shard-00-02.uwgnz.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-g8uqlj-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

//Fire graphqlHTTP any time a request to '/graphql' comes in
app.use(
  "/graphql",
  graphqlHTTP({
    //Define schema
    schema: schema,
    //start graphiql on request
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
