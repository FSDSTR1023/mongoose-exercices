const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Master's program
const masterSchema = new Schema({
  name: String,
  year: Number,
  description: String,
});

// Create a model from the schema
module.exports = mongoose.model("Master", masterSchema);
