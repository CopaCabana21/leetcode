/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// https://leetcode.com/problems/two-sum/solutions/3619262/3-method-s-c-java-python-beginner-friendly/
// time complexity O(n)

var twoSum = function (nums, target) {

  let map = ({});
  let res;


  // use the fact that there are 2 pairs for the solution
  // if there are duplicates k,k,.., then the first check wont be in the map
  // since the solution is only 2 elements, then the second element check won't
  // be in conflict with the first one
  nums.some((ele, index) => {
    let complement = target - ele;
    if (complement in map) {
      res = [index, map[complement]];
      return true;
    }
    map[ele] = index;
  })


  return res;
};

// console.log(twoSum([3, 3], 6));

// -------------------------------------------

// time complexity: O(n)
// space complexity: O(n)

var twoSum2 = function (nums, target) {

  let map = ({});
  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (complement in map) {
      return [i, map[complement]]
    }
    map[nums[i]] = i;
  }

  return []
};

// console.log(twoSum2([3, 3], 6));


//* ----------------------------------------------------------------------

// redo

var twoSum3 = function (nums, target) {

  let tally = {};
  // O(n)
  nums.forEach((num, index) => {
    if (!tally[num]) {
      tally[num] = [index]
    } else {
      tally[num].push(index)
    }
  });

  // O(n)
  for (let i = 0; i < nums.length; i++) {
    const found = tally[target - nums[i]]; // O(1)
    if (found) {
      const foundDiff = found.find(val => val !== i); // O(1)
      if (foundDiff) return [i, foundDiff]
    }
  }
  return []
}

// tc: O(n)

// console.log(twoSum3([3, 3], 6));

