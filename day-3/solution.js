const fs = require("fs");

const data = fs.readFileSync("./big.txt", "utf-8");

// amazing thing https://extendsclass.com/regex-tester.html

const getProduct = (mul) => {
  let nums = mul.match(/\d+/g);
  return nums.reduce((product, curr) => product * +curr, 1);
};

const resolveMuls = () => {
  const regExp = /mul\([0-9]+(,[0-9]+)+\)/g;
  const matches = data.match(regExp);

  return matches.reduce((sum, match) => sum + getProduct(match), 0);
};

const resolveMulsWithInstructions = () => {
  const regExp = /mul\([0-9]+(,[0-9]+)+\)|(don't)|(do)/g;
  const matches = data.match(regExp);

  let isDo = true;

  return matches.reduce((sum, match) => {
    if (match === "do") {
      isDo = true;
    } else if (match === "don't") {
      isDo = false;
    } else if (isDo) {
      sum += getProduct(match);
    }
    return sum;
  }, 0);
};

console.log(resolveMuls());
console.log(resolveMulsWithInstructions());
