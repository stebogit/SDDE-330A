const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  timeToMeet: Date,
  credits: Number,
  capacity: Number,
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student',
  }],
})

const Course = model('Course', courseSchema)

module.exports = Course
