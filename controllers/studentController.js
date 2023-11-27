const Student = require("../models/student.model");

async function createStudent(req, res) {
  Student.create(req.body)
    .then((studentDoc) => {
      console.log(`Student create worked well: ${studentDoc}`);
      res.status(200).json(studentDoc);
    })
    .catch((error) => {
      console.log(`Creating a new student went wrong! Try again 😞 ${error}`);
      res.status(400).json(error);
    });
}

async function getStudentById(req, res) {
  Student.findById(req.params.id)
    .then((studentDoc) => {
      console.log("Found this student by their ID: ", studentDoc);
      res.status(200).json(studentDoc);
    })
    .catch((err) => {
      console.log("Error while getting the students: ", err);
      res.status(400).json(err);
    });
}

async function getStudents(req, res) {
  //get query paramter

  const { year, first_name, last_name } = req.query;

  const filter = {};
  if (year) {
    filter.birthyear = { $gte: year };
  }

  if (first_name) {
    filter.first_name = first_name;
  }

  if (last_name) {
    filter.last_name = last_name;
  }

  Student.find(filter)
    .then((studentDocs) => {
      console.log("Found this: ", studentDocs);
      res.status(200).json(studentDocs);
    })
    .catch((err) => {
      console.log("Error while getting the students: ", err);
      res.status(400).json(err);
    });
}

async function getStudentsByYear(req, res) {
  Student.find({
    birthyear: { $gte: req.params.year },
  })
    .then((studentDocs) => {
      console.log("Found this: ", studentDocs);
      res.status(200).json(studentDocs);
    })
    .catch((err) => {
      console.log("Error while getting the students: ", err);
      res.status(400).json(err);
    });
}

async function updateStudent(req, res) {
  Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //You should set the new option to true to return the document after update was applied.
  })
    .then((updatedStudent) => {
      console.log("Updated student: ", updatedStudent);
      res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      console.log("Error while updating the student: ", err);
      res.status(400).json(err);
    });
}

async function massiveUpdate(req, res) {
  Student.updateMany(req.body, { $inc: { birthyear: 1 } }) // birthyear = birthyear + 1
    .then((updatedStudents) => {
      console.log("Updated students: ", updatedStudents);
      res.status(200).json(updatedStudents);
    })
    .catch((err) => {
      console.log("Error while updating students: ", err);
      res.status(400).json(err);
    });
}

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  massiveUpdate,
  getStudentsByYear,
};
