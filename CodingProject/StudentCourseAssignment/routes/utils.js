module.exports = {
  GRADES: {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    F: 0
  },
  average: (array) => array.reduce((a, b) => a + b) / array.length,
}
