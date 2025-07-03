// https://takeuforward.org/plus/dsa/problems/check-if-an-array-represents-a-min-heap-

class Solution {
  isHeap(nums) {
    for (let i = 0; i < nums.length; i++) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      if (left < nums.length && nums[left] < nums[i]) return false;
      if (right < nums.length && nums[right] < nums[i]) return false;
    }

    return true
  }
}

let sol = new Solution();
let nums = [10, 20, 30, 21, 23]
console.log(sol.isHeap(nums));
