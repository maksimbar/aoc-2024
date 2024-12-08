const fs = require("fs");

const data = fs.readFileSync("big.txt", "utf-8");

const records = data.split("\n").map((record) => record.split(" "));

isMonotonic = (record) => {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 0; i < record.length - 1; i++) {
    const current = +record[i];
    const next = +record[i + 1];

    if (current > next) isIncreasing = false;
    if (current < next) isDecreasing = false;
  }

  return isIncreasing || isDecreasing;
};

const isSafe = (record) => {
  if (isMonotonic(record)) {
    for (let i = 0; i < record.length - 1; i++) {
      let diff = Math.abs(+record[i] - +record[i + 1]);
      if (diff < 1 || diff > 3) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
};

const isMegaSafe = (record) => {
  if (isSafe(record)) {
    return true;
  } else {
    for (let i = 0; i < record.length; i++) {
      const filteredRecord = record.filter((_, index) => index !== i);
      if (isSafe(filteredRecord)) {
        return true;
      }
    }
  }
  return false;
};

let safeRecords = 0,
  megaSafeRecords = 0;

for (let record of records) {
  if (isSafe(record)) {
    safeRecords++;
  }
  if (isMegaSafe(record)) {
    megaSafeRecords++;
  }
}

console.log(safeRecords);
console.log(megaSafeRecords);
