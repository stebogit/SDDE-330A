const express = require('express')
const router = express.Router()
const { models: { Course, Student, Grade }, GRADES } = require('../database')
const { average } = require('../utils')

router.post('/createCourse', async (req, res, next) => {
  try {
    const course = new Course(req.body)
    await course.save()
    res.json({ success: true, data: course })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

router.post('/updateCourse', async (req, res, next) => {
  try {
    const { _id, ...updates} = req.body
    const course = await Course.findByIdAndUpdate(_id, updates, { new: true })
    if (course) {
      return res.json({ success: true, data: course })
    }
    res.status(404).json({ success: false, message: 'Course not found' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

router.post('/addStudentToCourse', async (req, res, next) => {
  try {
    const { studentId, courseId } = req.body
    const student = await Student.findById(studentId).populate('courses')
    const course = await Course.findById(courseId).populate('students')

    if (!student || !course) {
      return res.status(404).json({ success: false, message: 'Resource not found' })
    }
    if (course.students.length >= course.capacity) {
      res.status(400).json({ success: false, message: 'Course is full' })
    }
    const busy = student.courses.find(c => c.timeToMeet === course.timeToMeet)
    if (busy) {
      res.status(400).json({ success: false, message: 'Student\'s schedule already busy at this time' })
    }

    course.students = course.students.filter((s) => s._id.toString() !== studentId)
    course.students.push(student)
    await course.save()

    student.courses = student.courses.filter((c) => c._id.toString() !== courseId)
    student.courses.push(course)
    await student.save()

    return res.json({ success: true, data: course })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

router.post('/removeStudentFromCourse', async (req, res, next) => {
  try {
    const { studentId, courseId } = req.body
    const student = await Student.findById(studentId).populate('courses')
    const course = await Course.findById(courseId).populate('students')
    if (!student || !course) {
      return res.status(404).json({ success: false, message: 'Resource not found' })
    }

    course.students = course.students.filter((s) => s._id.toString() !== studentId)
    await course.save()

    student.courses = student.courses.filter((c) => c._id.toString() !== courseId)
    await student.save()

    return res.json({ success: true, data: course })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

router.get('/calculateCourseAverage', async (req, res, next) => {
  try {
    const grades = await Grade.find({ courseId: req.query.courseId })
    if (grades.length) {
      return res.json({ success: true, data: average(grades.map(g => GRADES[g.value])) })
    }
    res.status(404).json({ success: false, message: 'No student grades found for the course' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

router.get('/getStudentsOfCourse', async (req, res, next) => {
  try {
    const course = await Course.findById(req.query.courseId).populate('students')
    if (course) {
      return res.json({ success: true, data: course.students })
    }
    res.status(404).json({ success: false, message: 'Course not found' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

router.post('/setStudentGradeForCourse', async (req, res, next) => {
  try {
    const { studentId, courseId, grade } = req.body

    if (!Object.keys(GRADES).includes(grade)) {
      res.status(400).json({ success: false, message: 'Invalid grade value' })
    }

    const record = new Grade({ studentId, courseId, value: grade })
    await record.save()

    return res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
