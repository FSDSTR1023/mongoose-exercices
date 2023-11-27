const Student = require('../models/student.model')

async function createStudent(req, res){
    Student.create(req.body)
        .then(studentDoc => {
            console.log(`Student create worked well: ${studentDoc}`)
        res.status(200).json(studentDoc)
        })
        .catch(error => {
            console.log(`Creating a new student went wrong! Try again 😞 ${err}`)
            res.status(400).json(error)
        }
    );

}

async function getStudentById(req,res) {
    Student.findById(req.params.id)
        .then(studentDoc => {
            console.log('Found this student by their ID: ', studentDoc)
            res.status(200).json(studentDoc)
            })
        .catch(err => {
            console.log('Error while getting the students: ', err)
            res.status(400).json(err)
            }
            );
}

async function getStudents(req,res) {
    Student.find({
        birthyear: {$gte: 1980}
    })
        .then(studentDocs => {
            console.log('Found this: ', studentDocs)
            res.status(200).json(studentDocs)
            }
            )
        .catch(err => {
            console.log('Error while getting the students: ', err)
            res.status(400).json(err)
        });        
}

async function updateStudent(req,res) {
    Student.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { 
          new: true 
        }
      )
        .then(updatedStudent => {
            console.log('Updated student: ', updatedStudent)
            res.status(200).json(studentDocs)
        } 
        )
        .catch(err => {
            console.log('Error while updating the student: ', err)
            res.status(400).json(err)
        }
        );
    }

async function deleteStudent(req, res) {
    Student.findByIdAndDelete(req.params.id) 
        .then(deletedStudent => {
            console.log('Deleted student with id: ', deletedStudent)
            res.status(200).json(deletedStudent)
            })
        .catch(err => {
            console.log('Error while deleting one student: ', err)
            res.status(400).json(err)
            }
            );
}




module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}