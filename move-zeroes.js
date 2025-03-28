// https://leetcode.com/problems/move-zeroes/description/


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

var moveZeroes = function(nums) {

    let maxLength = nums.length;
    let index = 0;
    
    for (let i = 0; i < maxLength; i++) { // O(n)
        if(nums[index] === 0){
            nums.push(nums[index]); // O(1)
            nums.splice(index, 1) // O(k)
        }else{
            index++
        }
    }
    
};

// TC: O(n * (k + 1)) -> O(n^2)


// let nums = [1,0];
// console.log(nums);
// console.log(moveZeroes(nums));
// console.log(nums);


var moveZeroes2 = function(nums) {
    let insertPos = 0;
    for (let i = 0; i < nums.length; i++) {// O(n)
        if(nums[i] !== 0) nums[insertPos++] = nums[i]; //O(k)
    }

    for (let i = insertPos; i < nums.length; i++) { //O(n-k)
        nums[i] = 0;
    }
    
};

// TC: O(n + k + n - k) -> O(n)
// SC: O(1)

let nums = [0,1,0,3,12];
console.log(nums);
moveZeroes2(nums)
console.log(nums);
