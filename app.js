const express = require('express')
const app = express()
const port = 8000

//para obtener informacion en el body
app.use(express.json());

//para manejar credenciales en .env
require('dotenv').config();

//MongoDB and Mongoose Setup
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_SERVER+"/"+process.env.DB_NAME+"?retryWrites=true&w=majority";
async function main() {
  await mongoose.connect(mongoDB);
}
main().catch(err => console.log(err));

//Routes
let students = require("./routes/students.js")
app.use("/students", students)

app.get('/', (req, res) => {
  console.log(process.env.DB_USER);
  res.send('Hello World!')
})

// Function to close the database connection
function closeDatabaseConnection() {
  mongoose.connection.close(() => {
      console.log('Mongoose connection closed.');
  });
}
// Handle graceful shutdown
// Listens for the SIGINT signal (typically triggered by pressing Ctrl+C in the terminal) 
//to handle graceful shutdown. It closes the database connection and exits the process.
process.on('SIGINT', () => {
  closeDatabaseConnection();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

