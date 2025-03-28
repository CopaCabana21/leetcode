/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    
    const check = new Set([]);

    for(const ele of nums){ //O(n)
        if(check.has(ele)) return true; // O(1) average, O(n) worst case (unlikely)
        check.add(ele); //O(1)
    }

    return false
};


// TC: O(n)
// SC: O(n)

console.log(containsDuplicate([1,2,3,1]));