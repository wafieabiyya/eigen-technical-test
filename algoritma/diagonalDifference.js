function diagonalDifference(matrix) {
  let primary = 0,
    secondary = 0;

  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    primary += matrix[i][i];
    secondary += matrix[i][n - 1 - i];
  }

  return Math.abs(primary - secondary);
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(diagonalDifference(matrix));
