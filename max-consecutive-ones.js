/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let max = 0, curr = 0;
  nums.forEach(num => {
    curr = (num == 1) ? curr + 1 : 0;
    if(curr > max) max = curr;
  })

  return max;
};

console.log(findMaxConsecutiveOnes([1,0,1,1,0,1]
));