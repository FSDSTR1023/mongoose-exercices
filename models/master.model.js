const mongoose = require("mongoose");

// here we are getting access to Schema class from mongoose
const Schema = mongoose.Schema;

// Schema defines the STRUCTURE of documents in the collection
// this is the BLUEPRINT for all instances
const masterSchema = new Schema({
  name: String,
  year: Number,
  description: String,
});

module.exports = mongoose.model("Master", masterSchema);
