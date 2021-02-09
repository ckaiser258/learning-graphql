const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  //mongoDB automatically adds an id for us
  name: String,
  genre: String,
  authorId: String,
});

//make a model called 'Book', which is designed with the bookSchema object
module.exports = mongoose.model("Book", bookSchema);
