function average (array) {
  if (array.length === 1) return +array[0].toFixed(2)
  return +(array.reduce((a, b) => a + b) / array.length).toFixed(2)
}

module.exports = {
  average,
}
