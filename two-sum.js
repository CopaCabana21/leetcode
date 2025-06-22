/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// https://leetcode.com/problems/two-sum/solutions/3619262/3-method-s-c-java-python-beginner-friendly/
// time complexity O(n)

var twoSum = function(nums, target) {

    let map = ({});
    let res;

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

// console.log(twoSum([3,2,3],6));

// -------------------------------------------

// time complexity: O(n)
// space complexity: O(n)

var twoSum2 = function(nums, target) {

    let map = ({});
    debugger;
    for(let i = 0; i < nums.length; i++){
        let complement = target - nums[i];
        // console.log([i,map[complement]]);
        if(complement in map){
            return [i, map[complement]]
        }
        map[nums[i]] = i;
    }

    return []
};

console.log(twoSum2([3,2,3],6));
