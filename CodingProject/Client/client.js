const axios = require('axios');

const baseURL = 'http://localhost:1024'

const get = async (endpoint) => {
  return await call('GET', '/' + endpoint)
}

const post = async (endpoint, payload) => {
  return await call('POST', '/' + endpoint, payload)
}

const call = async (method, url, payload) => {
  const config = {
    method: method.toUpperCase(),
    url,
    baseURL,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    data: payload,
  }
  const { statusText, data } = await axios(config)
  if (statusText === 'OK') return data.data
  throw new Error(data.message)
}

//// COURSES  ////

const createCourse = async (course) => {
  return await post('courses/createCourse', course)
}

const updateCourse = async (course) => {
  return await post('courses/updateCourse', course)
}

const addStudentToCourse = async (student, course) => {
  return await post('courses/addStudentToCourse', {
    studentId: student._id,
    courseId: course._id,
  })
}

const removeStudentFromCourse = async (student, course) => {
  return await post('courses/removeStudentFromCourse', {
    studentId: student._id,
    courseId: course._id,
  })
}

const calculateCourseAverage = async (course) => {
  return await get(`courses/calculateCourseAverage?courseId=${course._id}`)
}

const getStudentsOfCourse = async (course) => {
  return await get(`courses/getStudentsOfCourse?courseId=${course._id}`)
}

const setStudentGradeForCourse = async (student, course, g) => {
  return await post('courses/setStudentGradeForCourse', {
    studentId: student._id,
    courseId: course._id,
    grade: g,
  })
}

//// STUDENTS  ////

const createStudent = async (student) => {
  return await post('students/createStudent', student)
}

const updateStudent = async (student) => {
  return await post('students/updateStudent', student)
}

const getCoursesOfStudent = async (student) => {
  return await get(`students/getCoursesOfStudent?studentId=${student._id}`)
}

const getStudentGrade = async (student, course) => {
  return await get(`students/getStudentGrade?studentId=${student._id}&courseId=${course._id}`)
}

const getStudentGradePointAverage = async (student) => {
  return await get(`students/getStudentGradePointAverage?studentId=${student._id}`)
}

//// /////

const resetDataStore = async () => {
  return await get(`resetDataStore`)
}

module.exports = {
  createStudent,
  updateStudent,
  getCoursesOfStudent,
  getStudentGrade,
  getStudentGradePointAverage,
  createCourse,
  updateCourse,
  addStudentToCourse,
  removeStudentFromCourse,
  calculateCourseAverage,
  getStudentsOfCourse,
  setStudentGradeForCourse,
  ///
  resetDataStore,
}
