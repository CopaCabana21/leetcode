/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    
    let _, count = 0;

    for (let i = 0; i < nums.length; i++) {
        if(nums[i] === val){
            nums[i] = _;
            count++;
        }
        
    }
    
    nums.sort()

    return nums.length - count;
};

// let nums = [3,2,2,3];
// console.log(removeElement(nums, 3));;
// console.log(nums);


// -------------------------------------------------------------------------



var removeElement2 = function(nums, val) {
    
    let insert = 0;

    for (let i = 0; i < nums.length; i++) {

        if(nums[i] !== val){
            nums[insert] = nums[i];
            insert++;
        }
    }

    for (let i = insert; i < nums.length; i++) {
        nums[i] = '';
        
    }
    return insert;
};

// tc: O(n)
// sc: O(1)

let nums2 = [3,2,2,3];
console.log(removeElement2(nums2, 3));;
console.log(nums2);