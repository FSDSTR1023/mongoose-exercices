const express = require("express");
const router = express.Router();
const { generateFilter } = require("../helpers/students.helper");

const studentController = require("../controllers/studentController");

router.use((req, res, next) => {
  const { year, first_name, last_name, id } = req.query;
  const filter = generateFilter(year, first_name, last_name, id);
  req.filter = filter;
  next();
});

router.post("/", studentController.createStudent);
router.put("/massiveUpdate", studentController.massiveUpdate);
router.put("/:id", studentController.updateStudent);
router.put("/", studentController.updateOrCreate);
router.get("/:id", studentController.getStudentById);
router.get("/", studentController.getStudents);
router.get("/year/:year", studentController.getStudentsByYear);
router.delete("/:id", studentController.deleteStudent);
router.delete("/", studentController.deleteStudents);

module.exports = router;
