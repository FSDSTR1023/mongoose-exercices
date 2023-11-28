const Student = require('../models/student.model')

async function createStudent(req,res) {
    Student.create(req.body)
        .then(studentDoc => {
            console.log(`Student create worked well: ${studentDoc}`)
            res.status(200).json(studentDoc)
        })
        .catch(error => {
            console.log(`Creating a new student went wrong! Try again 😞 ${error}`)
            res.status(400).json(error)
            }

        );
}

async function getStudentById(req,res) {
    Student.findById(req.params.id) // Get the student ID from the request parameters
    // If no student is found (studentDoc is null), a 404 status code is sent.
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

async function getStudents(req, res) {
    // To get all students, simply call your endpoint without any query parameters (e.g., GET /students).
    // To get students born after 1980, call your endpoint with the appropriate query parameter (e.g., GET /students?birthyear=1980).
    // Check if the birthyear query parameter exists
    const yearFilter = req.query.birthyear ? { birthyear: parseInt(req.query.birthyear) } : {};

    Student.find(yearFilter)
        .then(studentDocs => {
            console.log('Found students: ', studentDocs);
            res.status(200).json(studentDocs);
        })
        .catch(err => {
            console.log('Error while getting the students: ', err);
            res.status(400).json(err);
        });
}

async function countStudentsByName(req, res) {
    const nameToCount = req.params.name; // Or you could use a query parameter

    ///students/count/Pepe
    Student.countDocuments({ first_name: nameToCount })
        .then(total => {
            console.log(`Total number of students with name ${nameToCount}: `, total);
            res.status(200).json({ count: total });
        })
        .catch(err => {
            console.log('Error while counting the students: ', err);
            res.status(400).json(err);
        });
}

async function updateStudent(req, res) {
    const studentId = req.params.id; // Get the student ID from the request parameters
    const updateData = req.body; // Get the update data from the request body

    Student.findByIdAndUpdate(
        studentId,
        { $set: updateData }, // Apply the updates from req.body
        { new: true } // Return the updated document
    )
    .then(updatedStudent => {
        if (updatedStudent) {
            console.log('Updated student: ', updatedStudent);
            res.status(200).json(updatedStudent);
        } else {
            // If no student is found with the given ID
            res.status(404).send("Student not found");
        }
    })
    .catch(err => {
        console.log('Error while updating the student: ', err);
        res.status(400).json(err);
    });
}

async function massiveUpdate(req, res) {
    const nameToUpdate = req.params.name; // Or you could use a query parameter

    Student.updateMany(
        { first_name: nameToUpdate }, // Filter to match students with the specified name
        { $inc: { birthyear: 1 } } // Increment the birthyear by 1
    )
    .then(updatedResult => {
        console.log('Updated students: ', updatedResult);
        res.status(200).json(updatedResult);
    })
    .catch(err => {
        console.log('Error while updating students: ', err);
        res.status(400).json(err);
    });
}

// If you want a function that either updates a document based 
//on a provided ID or creates a new document if no such ID exists.
async function modifyOrCreateStudent(req, res) {
    const filter = req.body.filter; // Or other criteria
    const updateData = req.body.update;

    Student.findOneAndUpdate(
        filter,
        { $set: updateData },
        { new: true, upsert: true } // Returns the updated document and creates a new one if it doesn't exist
    )
    .then(result => {
        console.log('Updated or created student: ', result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log('Error: ', err);
        res.status(400).json(err);
    });
}

async function deleteStudentById(req, res) {
    const studentId = req.params.id; // Get the student ID from the request parameters

    Student.findByIdAndDelete(studentId)
        .then(deletedStudent => {
            if (deletedStudent) {
                console.log(`Deleted student with id: ${deletedStudent._id}`);
                res.status(200).json({ message: `Student with id ${deletedStudent._id} deleted successfully` });
            } else {
                // If no student is found with the given ID
                res.status(404).send("Student not found");
            }
        })
        .catch(err => {
            console.log('Error while deleting one student: ', err);
            res.status(400).json(err);
        });
}

async function deleteStudentsByName(req, res) {
    const nameToDelete = req.params.name; // Or you could use a query parameter

    Student.deleteMany({ first_name: nameToDelete })
        .then(deletedResult => {
            console.log('Deleted students: ', deletedResult);
            res.status(200).json({ message: `Students named ${nameToDelete} deleted successfully`, deletedCount: deletedResult.deletedCount });
        })
        .catch(err => {
            console.log('Error while deleting students: ', err);
            res.status(400).json(err);
        });
}

async function getStudentsWithMaster(req, res) {
    Student.find()
        .populate('masterId')
        .then(studentDocs => {
            console.log('Found this: ', studentDocs);
            res.status(200).json(studentDocs);
        })
        .catch(err => {
            console.log('Error while getting the students: ', err);
            res.status(400).json(err);
        });
}

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    countStudentsByName,
    massiveUpdate,
    modifyOrCreateStudent,
    deleteStudentById,
    deleteStudentsByName,
    getStudentsWithMaster
}