const mongoose = require("mongoose");

// here we are getting access to Schema class from mongoose
const Schema = mongoose.Schema;

// Schema defines the STRUCTURE of documents in the collection
// this is the BLUEPRINT for all instances
const studentSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    minLength: 2,
  },
  last_name: {
    type: String,
    required: true,
    default: "Doe",
    minLength: 2,
  },
  birthyear: {
    type: Number,
    required: true,
    min: 1900,
    max: 2050,
  },
  masterId: { type: mongoose.Schema.Types.ObjectId, ref: "Master" },
});

// Student is our mongoose model class
// all students in students collection will share these properties
// Mongoose turns models name to a collection name (Student --> students)
module.exports = mongoose.model("Student", studentSchema);
