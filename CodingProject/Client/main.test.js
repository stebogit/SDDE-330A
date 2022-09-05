const client = require('./client')

let ws
let py
let john
let ann
let johnCourses
let annCourses
let wsStudents
let pyStudents

beforeAll(async () => {
  await client.resetDataStore()
});

test('courses', async () => {
  ws = await client.createCourse({
    name: 'Web security',
    startDate: '2022-02-01',
    endDate: '2022-04-30',
    timeToMeet: 'Mondays - s:13:00, e:14:00',
    credits: 5,
    capacity: 10
  })
  expect(ws.name).toBe('Web security')
  expect(ws.endDate).toBe('2022-04-30T00:00:00.000Z')

  py = await client.createCourse({
    name: 'Python Programming',
    startDate: '2022-02-01',
    endDate: '2022-04-30',
    timeToMeet: 'Mondays - s:12:00, e:13:00',
    credits: 5,
    capacity: 25
  })
  expect(py.name).toBe('Python Programming')
  expect(py.endDate).toBe('2022-04-30T00:00:00.000Z')

  ws = await client.updateCourse({
    ...ws,
    endDate: '2022-03-31',
  })
  expect(ws.endDate).toBe('2022-03-31T00:00:00.000Z')
})

test('students', async () => {
  john = await client.createStudent({
    name: 'Jon',
    creditCapacity: 25
  })

  ann = await client.createStudent({
    name: 'Ann McDonney',
    creditCapacity: 25
  })

  expect(john.name).toBe('Jon')
  expect(ann.name).toBe('Ann McDonney')

  john = await client.updateStudent({
    ...john,
    name: 'John Bell',
  })
  expect(john.name).toBe('John Bell')
})

test('student courses', async () => {
  await client.addStudentToCourse(ann, ws)
  await client.addStudentToCourse(ann, py)
  await client.addStudentToCourse(john, ws)
  await client.addStudentToCourse(john, py)
  await client.removeStudentFromCourse(john, py)

  johnCourses = (await client.getCoursesOfStudent(john)).map(c => c.name)
  annCourses = (await client.getCoursesOfStudent(ann)).map(c => c.name)
  expect(johnCourses).toContain('Web security')
  expect(annCourses).toContain('Python Programming')
  expect(johnCourses).not.toContain('Python Programming')

  wsStudents = (await client.getStudentsOfCourse(ws)).map(s => s.name)
  pyStudents = (await client.getStudentsOfCourse(py)).map(s => s.name)
  expect(wsStudents).toContain('Ann McDonney')
  expect(pyStudents).toContain('Ann McDonney')
  expect(pyStudents).not.toContain('John Bell')
})

test('grades', async () => {
  await client.setStudentGradeForCourse(ann, py, 'A')
  await client.setStudentGradeForCourse(ann, ws, 'B')
  await client.setStudentGradeForCourse(john, ws, 'D')

  expect(await client.getStudentGrade(ann, py)).toBe('A')
  expect(await client.getStudentGrade(john, ws)).toBe('D')

  expect(await client.getStudentGradePointAverage(ann)).toBe(4.5)
  expect(await client.getStudentGradePointAverage(john)).toBe(2)

  expect(await client.calculateCourseAverage(ws)).toBe(3)
})
