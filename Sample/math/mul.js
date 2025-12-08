console.log("Mul module executed");

require("../xyz");

const calculateMul = (a, b) => {
  const mul = a * b;
  console.log(mul);
};


module.exports = {
    calculateMul: calculateMul
}