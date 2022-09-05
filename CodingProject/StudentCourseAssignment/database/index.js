const mongoose = require('mongoose')

async function connect () {
  await mongoose.connect(process.env.DB_URL, {
    keepAlive: true,
    connectTimeoutMS: 30000,
  }, (err) => {
    if (err) console.error(err)
    else console.log('DB Connected')
  })
}

const GRADES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  F: 0
}

module.exports = {
  connect,
  models: {
    Course: require('./models/Course'),
    Student: require('./models/Student'),
    Grade: require('./models/Grade'),
  },
  GRADES
}
