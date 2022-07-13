const express = require('express')
const router = express.Router()

router.post('/createCourse', (req, res, next) => {
  const course = req.body.c // get from DB
  res.send(true)
})

router.put('/updateCourse', (req, res, next) => {
  const course = req.body // get from DB
  res.send(true)
})

router.put('/addStudentToCourse', (req, res, next) => {
  const student = req.query.s // get from DB
  const course = req.query.c // get from DB
  res.send(true)
})

router.delete('/removeStudentFromCourse', (req, res, next) => {
  const student = req.query.s // get from DB
  const course = req.query.c // get from DB
  res.send(true)
})

router.get('/calculateCourseAverage', (req, res, next) => {
  const course = req.query.c // get from DB
  res.send(true)
})

router.get('/getStudentsOfCourse', (req, res, next) => {
  const course = req.query.c // get from DB
  res.send(true)
})

router.put('/setStudentGradeForCourse', (req, res, next) => {
  const student = req.body.s // get from DB
  const course = req.query.c // get from DB
  res.send(true)
})

module.exports = router
