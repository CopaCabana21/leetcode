
// greedy solution

// it's called greedy because each time it starts with the smallest posible number to build a group of k elements

var isPossibleDivide = function (nums, k) {

  if (nums.length % k !== 0) return false;

  let freqs = new Map();

  // O(n)
  for (const ele of nums) {
    freqs.set(ele, (freqs.has(ele)) ? freqs.get(ele) + 1 : 1)
  }

  // O(nlog(n))
  nums = Array.from(freqs.keys()).sort((a, b) => a - b);

  // the main loop is O(n * k) because at max we iterate over k elements in each element at worst. The duplicates are substracted as an operation, so it doesnt matter how many duplicates there are because we dont process them.

  for (const ele of nums) {
    let freq = freqs.get(ele);
    if (freq > 0) {
      // Try to build k consecutive numbers
      // there has to be a total of freq groups
      for (let i = 0; i < k; i++) {

        let currNum = ele + i;
        let currFreq = freqs.get(currNum) || 0;
        if (currFreq - freq < 0) return false;
        freqs.set(currNum, currFreq - freq)
      }
    }
  }

  return true
};

// tc: O(nlog(n) + n*k))
// sc: O(n)


console.log(isPossibleDivide([5, 7, 8, 8, 7, 4, 3, 6], 1));
console.log(isPossibleDivide([16, 21, 26, 35], 4));