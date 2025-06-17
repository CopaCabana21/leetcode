
// recursive
// very inefficient
// it repeats calculations for subsequent numbers by calling the function
// two times for each element and subsequent elements depends on those two.

// tc: O(2^n)
// sc: O(1)

function fiboRecursive(n) {
  if (n < 2) return n

  return fiboRecursive(n - 2) + fiboRecursive(n - 1)
}

console.log(fiboRecursive(10));
let fiboSeries = [...Array(11).keys()].map(ele => fiboRecursive(ele));
console.log(fiboSeries);

// -------------------------------------------------------------------------
console.log('-'.repeat(70));
// iterative

// tc: O(n)
// sc: O(1)

function fiboIterative(n) {
  if (n < 2) return n

  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr]
  }

  return curr;
}


console.log(fiboIterative(10));


// ------------------------------------------------------------------------
console.log('-'.repeat(70));

// using memoization: Top-Down

// all subsequent calls use the reference to the memo object created at the top call.
// there are two duplicate calls but the second one has a constant time.
// So the actual computation is once per element.

// tc: O(n)

function fiboMemoTD(n, memo = {}) {

  if (n in memo) return memo[n];
  if (n < 2) return n;

  // memo is passed by reference
  memo[n] = fiboMemoTD(n - 2, memo) + fiboMemoTD(n - 1, memo);

  return memo[n]
}

console.log(fiboMemoTD(10));

// ------------------------------------------------------------------------
console.log('-'.repeat(70));

// using tabulation : Bottom-Up
// It is called a tabulation because we fill an array
// is an iterative method where we store values

// tc: O(n)
// sc: O(n)

function fiboTabulation(n) {

  if (n < 2) return n;

  const dp = [0, 1];

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }

  return dp[n]
}

console.log(fiboTabulation(10));

// space optimized dp
// is just the iterative method where we don't store values

// tc: O(n)
// sc: O(1)
 

function fiboTabulationOptimized(n) {
  if (n < 2) return n

  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr]
  }

  return curr;
}

console.log(fiboTabulationOptimized(10));
