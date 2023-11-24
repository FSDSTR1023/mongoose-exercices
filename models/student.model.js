const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  first_name: String,
  last_name: String,
  birthyear: Number,
});
module.exports = mongoose.model("Student", studentSchema);

