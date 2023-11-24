const express = require('express')
const router = express.Router()
const studentController = require ('../controllers/studentController')

router.post('/create', studentController.createStudent )
router.get('/:id', studentController.getStudentById )
router.get('/', studentController.getStudents )

module.exports = router 


