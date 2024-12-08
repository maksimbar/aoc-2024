import fs from "fs";

let data = fs.readFileSync("./big.txt", { encoding: "utf8" });

let l = [], r = [];

data.split("\n").map((distance) => {
  const loc = distance.split(/\s+/);
  l.push(+loc[0]);
  r.push(+loc[1]);
});

const getTotalDistance = () => {
  let total = 0;

  l.sort();
  r.sort();

  for (let i = 0; i < l.length; i++) {
    let distance = Math.abs(l[i] - r[i]);
    total += distance; 
  }

  return total;
};

const getSimilarityScore = () => {
  let appearances = new Map();

  for (let id of r) {
    if (appearances.has(id)) {
      appearances.set(id, appearances.get(id) + 1);
    } else {
      appearances.set(id, 1);
    }
  }

  const score = l.reduce(
    (score, curr) => score + curr * (appearances.get(curr) || 0),
    0
  );

  return score;
};

console.log(getTotalDistance());
console.log(getSimilarityScore());
