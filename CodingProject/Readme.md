# Course Project: StudentCourseAssignment service

In this project, the student will build the backend service including the API and data store for a
StudentCourseAssignment application. This project will address some fundamental topics in application data modeling and
remote service application implementation.

StudentCourseAssignment application will represent a student course scheduling tool with the following constraints and
features:

- Course has a name, start date, end date, time to meet (Mondays start: 13H00M, end: 14H00M for example), credit, and capacity
- Student has name, credit capacity
- Student has 1 grade per Course
- Student cannot take 2 Courses at the same time 

This is a library with following functionalities…

1. `createStudent(Student s) -> Boolean // true if succeed else false`
2. `updateStudent(Student s) -> Boolean // true if succeed else false`
3. `createCourse(Course c) -> Boolean // true if succeed else false`
4. `updateCourse(Course c) -> Boolean // true if succeed else false`
5. `addStudentToCourse(Student s, Course c) -> Boolean // true if succeed else false`
6. `removeStudentFromCourse(Student s, Course c) -> Boolean // true if succeed else false`
7. `calculateCourseAverage(Course c) -> Double // A – 5, B – 4, C – 3, D – 2, F – 0`
8. `getCoursesOfStudent(Student s) -> List<Course>`
9. `getStudentsOfCourse(Course c) -> List<Student>`
10. `getStudentGrade(Student s, Course c) -> String // “A”, “B”, “C”, “D”, “F”`
11. `getStudentGradePointAverage(Student s) -> Double // A – 5, B – 4, C – 3, D – 2, F – 0`
12. `resetDataStore(Long timestamp) -> Boolean // true if succeed else false`
13. `setStudentGradeForCourse(Student s, Course c, String grade) -> Boolean // true if succeed else false`
14. the `static main(String[] args)` function will call each of the functions listed to demonstrate how each function can be used.

The StudentCourseAssignment application will store its data into a local cache application by making service request to
a DataService that the student will implement. **The DataService can be a gRPC or RESTful api service that listens to
localhost:1024 and StudentCourseAssignment functions will make requests to use the DataService.**

The student is expected to design the api and the data store so that the StudentCourseAssignment libraries can store and
update its data and perform required functionalities with optimal time complexity. The datastore should account for
potential asynchronous calls and race conditions (Sample case: if current students of Course A includes [1, 2, 3], a
call Tx0 is made to remove 2, and a call Tx1 is made to add student 4, then a Tx0 would save [1, 3], and Tx1 would
save [1, 2, 3, 4] but the correct answer after these two calls should be [1, 3, 4]).

The DataService should also be recoverable in the event that the application needs to be restarted. Students can decide
recoverable options such as a write-ahead-log. For this functionality, the `StudentCourseAssignment` application’s
`resetDataStore()` function will take a GMT epoch timestamp and the DataStore will be set to the latest state up to that
timestamp. If timestamp is null, then the DataStore will be completely reset.

## Tools and Languages

Students can code this on their local desktop and share the code with us via a package or could code it in the cloud (
Amazon/MS/Google etc.) and then share the code/end point with us.

Any tool and language can be used for development. We encourage you to implement a custom data store to take advantage
of custom indexing and data structure opportunities, but open source data stores may also be used such as Redis, SQLite,
Postgres, etc. If the data store is not in memory of data service (for example, using an open source data store like
Redis), then the DataService should make calls to the data store.

A simple readme text file should be provided to show to command to run both the application and the data service

## Grading

Logical and maintainable code:
- Follows software principles and uses design patterns to make project extensible and easily maintainable
- Each function has sufficient unit testing

Correctness and performance:
- Functions perform its operations correctly to produce the expected result in all cases
- Functions are optimally designed in terms of space and time complexity


---

#### Coding Project Check-In #1
Student should set up the gRPC or RESTful data service and make sure the connection between
the application and the data service is working along with a general data model of the solution (either relational or
document models are fine). Student should be able to rationalize their choices with pros and cons.

# Questions

- mongo DB is not publicly accessible, how to share?
- does mongo DB allow for "undo" or track history?
  https://lucid.app/lucidchart/6da5c026-979a-4931-8d5b-d682b5130bb7/edit?viewport_loc=-4%2C-341%2C2415%2C1343%2CHWEp-vi-RSFO&invitationId=inv_8596d451-e363-43fd-8b44-6bdb6da276d2#- what are the components and the entities?
- 
