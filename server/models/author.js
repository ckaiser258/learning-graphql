const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  //mongoDB automatically adds an id for us
  name: String,
  age: Number,
});

//make a model called 'Book', which is designed with the bookSchema object
module.exports = mongoose.model("Author", authorSchema);
