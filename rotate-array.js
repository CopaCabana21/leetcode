/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    
    let len = nums.length;
    let times = k % len;

    for (let i = 0; i < len - times; i++) { // O(n-k)
        nums.push(nums[i]); // O(1)
    }
    
    nums.splice(0, len - times); // O(n - k)

};


// O(n-k + 1 + n - k) -> O(2n) -> O(n)

console.log(rotate([1,2,3,4,5,6,7], 3));
console.log(rotate([-1,-100,3,99], 2));
console.log(rotate([1,2], 3));


// ----------------------------------------------------------------------------

var rotate2 = function(nums, k) {
    
    k = k % nums.length;

    reverse(nums, 0, nums.length - k - 1);
    reverse(nums, nums.length - k, nums.length - 1);
    reverse(nums, 0, nums.length - 1);
};


let reverse = (arr, start, end) => {

    let temp;

    while(end > start){
        temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }

}

// TC: O(2N) -> O(n)
// SC: O(2) -> O(1)

let temp = [1,2,3,4,5,6,7];
rotate2(temp, 3);
console.log(temp);