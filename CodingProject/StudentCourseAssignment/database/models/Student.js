const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  creditCapacity: Number,
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
})

const Student = model('Student', userSchema)

module.exports = Student
