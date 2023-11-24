var express = require('express')
var router = express.Router()

const studentController = require('../controllers/studentController')

router.post('/create', studentController.createStudent)
router.put('/massiveUpdate', studentController.massiveUpdate)
router.get('/', studentController.getStudents)
router.get('/:id', studentController.getStudentById)
router.put('/:id', studentController.updateStudent)

module.exports = router