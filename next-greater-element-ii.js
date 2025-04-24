/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
    
    const stack = [];
    let len = nums.length;
    const res = Array(len).fill(-1);

    for (let i = 0; i < 2*nums.length; i++) {

        // console.log(i % len, nums[i % len], stack, res);

        while(stack.length !== 0 && nums[stack[stack.length-1]] < nums[i % len]){
            res[stack.pop()] = nums[i % len]; // O(1)
        }

        stack.push(i % len) // O(1)
    }

    return res

}

// tc: O(2n) -> O(n)
// sc: O(2n) -> O(n)

console.log(nextGreaterElements([1,2,3,4,5,6,5,4,5,1,2,3]));