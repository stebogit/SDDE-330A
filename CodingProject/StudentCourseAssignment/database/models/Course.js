const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  timeToMeet: { type: String, required: true },
  credits: { type: Number, required: true },
  capacity: { type: Number, required: true },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student',
  }],
})

const Course = model('Course', courseSchema)

module.exports = Course
