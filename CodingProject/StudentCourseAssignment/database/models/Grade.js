const { Schema, model } = require('mongoose')

const gradeSchema = new Schema({
  value: String, //  A, B, etc.
  courseId: String,
  studentId: String,
})

const Grade = model('Grade', gradeSchema)

module.exports = Grade
