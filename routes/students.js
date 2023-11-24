const express = require('express')
const router = express.Router()

const studentController = require('../controllers/studentController')

router.post('/create', studentController.createStudent )
router.get('/', studentController.getStudents )
router.get('/:id', studentController.getStudentById )
router.put('/:id', studentController.updateStudent )

module.exports = router