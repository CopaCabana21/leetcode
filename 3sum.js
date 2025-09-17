/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// two pointer method

// tc: O(nlogn + n^2) -> O(n^2)
// sc: O(1)

// [-1,0,1,2,-1,-4]
// [-4,-1,-1,0,1,2]
//   i  j        k

var threeSum = function (nums) {

  let res = [];
  // sort array:  O(n log n) 
  nums = nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // start 2 pointers
    let j = i + 1, k = nums.length - 1;

    // console.log('i iter: ', [i, j, k]);

    // iterate rest of nums
    let sum;
    while (j < k) {
      sum = nums[i] + nums[j] + nums[k];
      // console.log(`sum: ${sum}, `, [j, k], [nums[i], nums[j], nums[k]]);

      if (sum < 0) {
        j++;
      } else if (sum > 0) {
        k--;
      } else {
        let triplet = [nums[i], nums[j], nums[k]];
        res.push(triplet);

        // check if next j and k is the same as before
        while (nums[j] === triplet[1] && j < k) j++;
        while (nums[k] === triplet[2] && j < k) k--;
      }
    };
  }

  return res;
};

// console.log(threeSum([-1, -1, 1, 2, -1, -4]));
// console.log(threeSum([0, 0, 0]));


//* ---------------------------------------------------------------------------

var threeSum2 = function (nums) {

  // arrays are for iterating
  // and sets will be for checking in O(1)
  let less = [], greater = [], zeroes = [];
  let res = new Set();

  // sc: O(n)
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      greater.push(nums[i])
    } else if (nums[i] < 0) {
      less.push(nums[i])
    } else {
      zeroes.push(0)
    }
  }

  // check triplets with zero as center
  // sc: O(n)

  // to check in O(1)
  let lessSet = new Set(less);

  if (zeroes.length > 0) {
    if (zeroes.length >= 3) res.add(JSON.stringify([0, 0, 0]));

    for (const num of greater) {
      if (lessSet.has(-num)) res.add(JSON.stringify([-num, 0, num]))
    }
  }

  // check triplets without zero, iterating two positive pairs
  // sc: O(n^2)*(constant search in each one)

  // to check in O(1)
  const greaterSet = new Set(greater);
  for (let i = 0; i < greater.length; i++) {
    for (let j = i + 1; j < greater.length; j++) {
      if (lessSet.has(- (greater[i] + greater[j]))) {
        const triplet = [-1 * (greater[i] + greater[j]), greater[i], greater[j]].sort((a, b) => a - b);
        res.add(JSON.stringify(triplet))
      }
    }
  }

  // check triplets without zero, iterating two negative pairs
  // sc: O(n^2)*(constant search in each one)

  for (let i = 0; i < less.length; i++) {
    for (let j = i + 1; j < less.length; j++) {
      console.log(less[i], less[j]);
      if (greaterSet.has(- (less[i] + less[j]))) {
        const triplet = [- (less[i] + less[j]), less[i], less[j]].sort((a, b) => a - b);
        res.add(JSON.stringify(triplet))
      }
    }
  }

  return [...res].map(str => JSON.parse(str));

};

// tc: O(n + n^2 + n^2) -> O(n^2)
// sc: O(n)

// console.log(threeSum2([0, 0, 0]));
// console.log(threeSum2([-1, -1, 1, 2, -1, -4]));
// console.log(threeSum2([-2, -3, -1, -1, 0, 2, 1, 3, -4]));

//* ---------------------------------------------------------------------------

// reuse two-sum solution
// this gives a timeout

var threeSum3 = function (nums) {

  let res = [];
  const seen = new Set();

  function findPair(skip, target) {
    const map = {};
    const pairs = [];
    for (let i = 0; i < nums.length; i++) {
      if (i === skip) continue;
      let rest = target - nums[i];
      if (rest in map) pairs.push([nums[i], nums[map[rest]]]);
      map[nums[i]] = i;
    }
    return pairs;
  }

  for (let i = 0; i < nums.length; i++) { // n
    const pairs = findPair(i, -(nums[i])); // O(n)
    for (const pair of pairs) { // O(n) worst case
      const triplet = [nums[i], ...pair].sort((a, b) => a - b); // O(3log3)
      // [0,0,0,0,0,...,0] worst case.
      // each one could expand to n/2 pairs
      // so at worst space is O(n^2)
      const key = triplet.join(',');
      if (!seen.has(key)) {
        res.push(triplet);
        seen.add(key)
      }
    }
  }

  return res;
}

// tc: O(n*n*n*C) -> O(n**3)
// sc: O(n**2)

console.log(threeSum3([-1, 0, 1, 2, -1, -4]));


