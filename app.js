require('dotenv').config();

const express = require('express')
const app = express()
const port = 8000
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_SERVER+"/"+process.env.DB_NAME+"?retryWrites=true&w=majority";

app.use(express.json())

async function main() {
  await mongoose.connect(mongoDB);
}
main().catch(err => console.log(err)); 

var students = require('./routes/students.js')
app.use('/students', students)


app.get('/', (req, res) => {
  console.log(process.env.DB_USER)
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

