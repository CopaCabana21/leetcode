
// https://takeuforward.org/plus/dsa/problems/convert-min-heap-to-max-heap

class Solution {
  minToMaxHeap(nums) {

    function heapifyDown(nums, i) {

      while (true) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let largest = i;

        if (left < nums.length && nums[i] < nums[left]) largest = left;
        if (right < nums.length && nums[i] < nums[right]) largest = right;

        if (largest === i) break;
        [nums[largest], nums[i]] = [nums[i], nums[largest]]
        i = largest;
      }

    }


    for (let i = Math.floor((nums.length - 2) / 2); i > -1; i--) {
      heapifyDown(nums, i)
    }

    return nums;
  }

}


let sol = new Solution();
let nums = [10, 20, 30, 21, 23]
nums = [-5, -4, -3, -2, -1]


console.log(sol.minToMaxHeap(nums));
