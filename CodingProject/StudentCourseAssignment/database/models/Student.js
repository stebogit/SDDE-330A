const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: {type: String, required: true},
  creditCapacity: { type: Number, required: true },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
})

const Student = model('Student', userSchema)

module.exports = Student
