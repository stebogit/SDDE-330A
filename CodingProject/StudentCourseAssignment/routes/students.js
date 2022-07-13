const express = require('express')
const router = express.Router()

router.post('/createStudent', (req, res, next) => {
  const student = req.body.s // get from DB
  // create student
  res.send(true)
})

router.put('/updateStudent', (req, res, next) => {
  const student = req.body.s // get from DB
  res.send(true)
})

router.get('/getCoursesOfStudent', (req, res, next) => {
  const student = req.query.s
  // get courses
  res.json([])
})

router.get('/getStudentGrade', (req, res, next) => {
  const student = req.query.s // get from DB
  const course = req.query.c // get from DB
  res.send(true)
})

router.get('/getStudentGradePointAverage', (req, res, next) => {
  const student = req.query.s // get from DB
  res.send(true)
})

module.exports = router
