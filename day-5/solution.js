const fs = require("fs");

const data = fs.readFileSync("./small.txt", { encoding: "utf-8" });

let [orders, updates] = data.split("\n\n");

let map = new Map();

orders.split("\n").map((page) => {
  let arr = page.split("|");
  if (map.has(arr[0])) {
    map.set(arr[0], map.get(arr[0]).add(arr[1]));
  } else {
    map.set(arr[0], new Set([arr[1]]));
  }
});

updates = updates.split("\n").map((page) => page.split(","));
let sum = 0;

for (let i = 0; i < updates.length; i++) {
  let isValidUpdate = true;
  for (let j = 0; j < updates[i].length - 1; j++) {
    if (!map.get(updates[i][j])?.has(updates[i][j + 1])) {
      isValidUpdate = false;
    }
  }
  if (isValidUpdate) {
    middle = Math.floor(updates[i].length / 2);
    sum += +updates[i][middle];
  }
}

console.log(sum);
