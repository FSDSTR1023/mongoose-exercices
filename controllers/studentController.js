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
       // birthyear: {$gte: 1980}
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

async function countStudents(req, res) {
    try {
        // Extracting the query parameter for the first name
        const firstName = req.query.first_name;

        // Building the query object
        const query = firstName ? { first_name: firstName } : {};

        // Counting the documents based on the query
        const count = await Student.countDocuments(query);

        console.log(`Number of students${firstName ? ` named ${firstName}` : ''}:`, count);
        res.status(200).json({ count });
    } catch (err) {
        console.error('Error while counting students:', err);
        res.status(500).json({ error: err.message });
    }
}

async function findByIdAndUpdate(req, res) {
    const studentId = req.params.id; // Get the student ID from the request parameters

    // Options for the update operation
    const options = {
        new: true // Return the updated document after the update is applied
    };

    try {
        const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, options);

        if (!updatedStudent) {
            // Handle the case where no student with the specified ID was found
            return res.status(404).json({ error: 'Student not found' });
        }

        console.log('Updated student: ', updatedStudent);
        res.json(updatedStudent); // Send the updated student as the response
    } catch (err) {
        console.error('Error while updating the student: ', err);
        res.status(500).json({ error: 'Internal server error' }); // Handle the error
    }
}


async function updateMany(req, res) {
    const firstNameToUpdate = req.query.first_name;
  
    Student.updateMany({ first_name: firstNameToUpdate }, { $inc: { birthyear: 1 } })
      .then((updatedStudents) => res.json({ message: "Updated students successfully", updatedStudents }))
      .catch((err) => res.status(500).json({ message: "Error while updating students", error: err }));
  }


  async function findByIdAndDelete(req, res) { 
    const studentId = req.params.id; // Get the student ID from the request parameters

    try {
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        console.log(`Deleted student with id: ${deletedStudent._id}`);
        res.json({ message: `Deleted student with id: ${deletedStudent._id}` });
    } catch (err) {
        console.log('Error while deleting one student: ', err);
        res.status(500).json({ message: 'Error while deleting one student', error: err });
    }
}


module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    countStudents,
    findByIdAndUpdate,
    updateMany,
    findByIdAndDelete
}


