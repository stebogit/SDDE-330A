const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const db = require('./database')

const isDevelopment = process.env.NODE_ENV === 'development'
const server = express()
db.connect()

// view engine setup
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'hbs')

server.use(logger(isDevelopment ? 'dev' : 'combined'))
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, 'public')))

server.use('/students', require('./routes/students'))
server.use('/courses', require('./routes/courses'))

server.get('/resetDataStore', async (req, res) => {
  const { models: { Course, Student, Grade } } = require('./database')
  // const t = req.timestamp
  await Course.deleteMany({})
  await Student.deleteMany({})
  await Grade.deleteMany({})
  res.json({ success: true })
})

// catch 404 and forward to error handler
server.use((req, res, next) => {
  next(createError(404))
})

// error handler
server.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = isDevelopment ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = server
