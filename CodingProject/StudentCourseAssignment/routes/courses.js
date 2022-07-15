const express = require('express')
const router = express.Router()
const { models: { Course } } = require('../database')

router.get('/getAll', async (req, res) => {
  try {
    const courses = await Course.find()
    res.json({ success: true, data: courses })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.post('/createCourse', async (req, res, next) => {
  try {
    const course = new Course(req.body)
    await course.save()
    res.json({ success: true })
  } catch (err) {
    res.status(404).json({ success: false, message: err.message })
  }
})

router.post('/updateCourse', async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.body.courseId, req.body, { new: true })
    if (course) {
      return res.json({ success: true })
    }
    res.status(400).json({ success: false, message: 'Course not found', })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, })
  }
})

router.post('/addStudentToCourse', (req, res, next) => {
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

router.post('/setStudentGradeForCourse', (req, res, next) => {
  const student = req.body.s // get from DB
  const course = req.query.c // get from DB
  res.send(true)
})

module.exports = router
