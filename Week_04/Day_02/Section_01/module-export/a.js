function isOdd(number) {
  if (number % 2 !== 0) {
    console.log(" number is odd !");
  }
}

function isEven(number) {
  if (number % 2 === 0) {
    return "Even";
  }
}

module.exports = {
  isEven,
  isOdd,
};
