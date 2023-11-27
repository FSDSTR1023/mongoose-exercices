const Student = require("../models/student.model");
require("../models/master.model");

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
  Student.find(req.filter)
    .populate("masterId")
    .exec()
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
  Student.updateMany(req.filter, { $set: req.body }) // birthyear = birthyear + 1
    .then((updatedStudents) => {
      console.log("Updated students: ", updatedStudents);
      res.status(200).json(updatedStudents);
    })
    .catch((err) => {
      console.log("Error while updating students: ", err);
      res.status(400).json(err);
    });
}

async function updateOrCreate(req, res) {
  Student.findOneAndUpdate(
    filter,
    { $set: { ...req.body, ...req.filter } },
    { new: true, upsert: true }
  ) // birthyear = birthyear + 1
    .then((updatedStudent) => {
      console.log("Updated students: ", updatedStudent);
      res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      console.log("Error while updating students: ", err);
      res.status(400).json(err);
    });
}

async function deleteStudent(req, res) {
  Student.findByIdAndDelete(req.params.id)
    .then((deletedStudent) => {
      console.log("Deleted student: ", deletedStudent);
      res.status(200).json(deletedStudent);
    })
    .catch((err) => {
      console.log("Error while deleting the student: ", err);
      res.status(400).json(err);
    });
}

async function deleteStudents(req, res) {
  Student.deleteMany(req.filter)
    .then((deletedStudents) => {
      console.log("Deleted students: ", deletedStudents);
      res.status(200).json(deletedStudents);
    })
    .catch((err) => {
      console.log("Error while deleting the students: ", err);
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
  updateOrCreate,
  deleteStudent,
  deleteStudents,
};
