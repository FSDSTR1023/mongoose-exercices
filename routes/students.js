const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')

router.post('/create', studentController.createStudent )
router.get('/count-students', studentController.countStudents)
router.get('/:id', studentController.getStudentById )
router.get('/', studentController.getStudents )
router.put('/students/update/:id', studentController.findByIdAndUpdate)
router.put('/updateMany', studentController.updateMany)
router.delete('/delete/:id', studentController.findByIdAndDelete)


module.exports = router