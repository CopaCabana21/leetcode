/**
 * @param {character[][]} grid
 * @return {number}
 */

var numIslands = function (grid) {

  let count = 0;
  let m = grid.length, n = grid[0].length;

  function dfs(i, j) {
    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] !== '1') return;
    grid[i][j] = '#'; // mark as processed
    dfs(i - 1, j);
    dfs(i + 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        dfs(i, j); // DFS: recursively traverse neighbours
        count++; // increase counter on return
      }
    }
  }

  return count;
};

let grid = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"]
];

console.log(numIslands(grid));;

