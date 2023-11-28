const express = require('express')
const router = express.Router()

const studentController = require('../controllers/studentController')

router.post('/', studentController.createStudent )
router.put('/massiveUpdate', studentController.massiveUpdate )
router.get('/studentsWithMaster', studentController.getStudentsWithMaster);
router.put('/:id', studentController.updateStudent )
router.get('/:id', studentController.getStudentById )
router.get('/', studentController.getStudents )
router.get('/count/:name', studentController.countStudentsByName);
router.post('/modifyOrCreateStudent', studentController.modifyOrCreateStudent);
router.delete('/students/:id', studentController.deleteStudentById);
router.delete('/students/deleteByName/:name', studentController.deleteStudentsByName);

// router.get('/year/:year', studentController.getStudentByYear )

module.exports = router