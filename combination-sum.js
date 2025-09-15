/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {

  let less = [];
  for (const ele of candidates) {
    if (ele <= target) less.push(ele);
  }
  less.sort((a, b) => b - a); // O(nlogn)
  let res = [];
  // console.log('-- start: ', candidates, target, less);
  for (let i = 0; i < less.length; i++) {
    // console.log('i: ', less[i], target);
    let quotient = Math.floor(target / less[i]);

    while (quotient > 0) {
      let rest = target - quotient * less[i];

      let count = quotient;
      let quotientSet = [];
      while (count--) quotientSet.push(less[i]);

      // console.log('quotientSet: ', quotientSet);
      // console.log('rest: ', rest);

      let combinations = [];
      if (rest === 0) res.push(quotientSet);

      let slice = less.slice(i + 1);
      if (slice.length > 0 && rest > 0) {
        combinations = combinationSum(slice, rest);
      }

      for (const comb of combinations) {
        res.push([...quotientSet, ...comb]);
      }
      quotient--;
    }
  }
  // console.log('-- end: ', res);
  return res
};

// tc: O(nlog(n) + n^2)
// sc: O(n)

// console.log(combinationSum([2, 3, 6, 7, 8], 7));
// console.log(combinationSum([2, 3, 5], 8));
// console.log(combinationSum([7, 3, 2], 18));

//* ----------------------------------------------------------------
// backtracking

var combinationSum2 = function (candidates, target) {

  let res = [];
  candidates.sort((a, b) => a - b); // O(nlogn)

  function backtrack(start, path, target) {
    // console.log(start, path, target);
    if (target === 0) {
      res.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      let remainder = target - candidates[i];
      if (remainder < 0) return;

      path.push(candidates[i]);
      backtrack(i, path, remainder);
      path.pop();
    }
  }

  backtrack(0, [], target);

  return res;
};

console.log(combinationSum2([2, 3, 5], 8));

// tc: O(nlogn)
// for each element we go a max depth of `target / min(candidates)`
// This is a general not precise upper bound
// not an actual value.
// So for the backtracking we do O(n**(target / min(candidates)))

// sc:
// recursive depth is `target / min(candidates)`
// at each level we add one element constant
// So the time complexity would be O(target / min(candidates))


//* --------------------------------------------------------------------------
// redo

var combinationSum3 = function (candidates, target) {

  let res = [];
  candidates.sort((a, b) => a - b);

  function backtrack(start, path, target) {

    if (target === 0) {
      res.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      const remainder = target - candidates[i];
      if (remainder < 0) return;

      path.push(candidates[i]);
      backtrack(i, path, remainder);
      path.pop();
    }
  }

  backtrack(0, [], target);

  return res;
}

console.log(combinationSum3([2, 3, 6, 7], 7));