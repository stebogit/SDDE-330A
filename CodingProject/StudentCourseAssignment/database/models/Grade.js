const { Schema, model } = require('mongoose')

const gradeSchema = new Schema({
  value: Number,
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
  },
})

const Student = model('Grade', gradeSchema)

module.exports = Student
