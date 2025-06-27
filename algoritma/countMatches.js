function countMatches(input, query) {
  return query.map((q) => input.filter((word) => word === q).length);
}

const INPUT = ["xc", "bbb", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

console.log(countMatches(INPUT, QUERY));
