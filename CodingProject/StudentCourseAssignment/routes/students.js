const express = require('express')
const router = express.Router()
const { models: { Student, Grade }, GRADES } = require('../database')
const { average } = require('../utils')

router.post('/createStudent', async (req, res, next) => {
  try {
    const student = new Student(req.body)
    await student.save()
    res.json({ success: true, data: student })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

router.post('/updateStudent', async (req, res, next) => {
  try {
    const { _id, ...updates } = req.body
    const student = await Student.findByIdAndUpdate(_id, updates, { new: true })
    if (student) {
      return res.json({ success: true, data: student })
    }
    res.status(404).json({ success: false, message: 'Student not found' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

router.get('/getCoursesOfStudent', async (req, res, next) => {
  try {
    const student = await Student.findById(req.query.studentId).populate('courses')
    if (student) {
      return res.json({ success: true, data: student.courses })
    }
    res.status(404).json({ success: false, message: 'Student not found' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

router.get('/getStudentGrade', async (req, res, next) => {
  try {
    const { studentId, courseId } = req.query
    const grade = await Grade.findOne({ studentId, courseId })
    if (grade) {
      return res.json({ success: true, data: grade.value })
    }
    res.status(404).json({ success: false, message: 'Course not found for the student' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

router.get('/getStudentGradePointAverage', async (req, res, next) => {
  try {
    const grades = await Grade.find({ studentId: req.query.studentId })
    if (grades.length) {
      return res.json({ success: true, data: average(grades.map(g => GRADES[g.value])) })
    }
    res.status(404).json({ success: false, message: 'No coursed found for the student' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
