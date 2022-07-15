const express = require('express')
const router = express.Router()
const { models: { Student, Grade } } = require('../database')
const { average } = require('./utils')

router.get('/getAll', async (req, res) => {
  try {
    const students = await Student.find()
    res.json({ success: true, data: students, })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.post('/createStudent', async (req, res, next) => {
  try {
    const student = new Student(req.body)
    await student.save()
    res.json({ success: true, data: student })
  } catch (err) {
    res.status(404).json({ success: false, message: err.message, })
  }
})

router.post('/updateStudent', async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    if (student) {
      return res.json({ success: true, data: student })
    }
    res.status(400).json({ success: false, message: 'Student not found', })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, })
  }
})

router.get('/getCoursesOfStudent', async (req, res, next) => {
  try {
    const student = await Student.findOne({ _id: req.query.studentId }).populate('courses')
    if (student) {
      return res.json({ success: true, data: student.courses })
    }
    res.status(400).json({ success: false, message: 'Student not found', })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, })
  }
})

router.get('/getStudentGrade', async (req, res, next) => {
  try {
    const grade = await Grade.findOne({ student: req.query.studentId, course: req.query.courseId })
    if (grade) {
      return res.json({ success: true, data: grade.value })
    }
    res.status(400).json({ success: false, message: 'Grade not found', })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, })
  }
})

router.get('/getStudentGradePointAverage', async (req, res, next) => {
  try {
    const grades = await Grade.find({ student: req.query.studentId })
    if (grades.length) {
      return res.json({ success: true, data: average(grades.map(g => g.value)) })
    }
    res.status(400).json({ success: false, message: 'No grades found', })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, })
  }
})

module.exports = router
