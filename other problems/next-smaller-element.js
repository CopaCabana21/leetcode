// https://www.geeksforgeeks.org/next-smaller-element/

var nextSmallerElement = function(nums) {
    
    const stack = [];
    const res = Array(nums.length).fill(-1);

    for (let i = 0; i < nums.length; i++) {
        
        while(stack.length !== 0 && nums[stack[stack.length-1]] > nums[i]){
            res[stack.pop()] = nums[i]
        }
        
        stack.push(i)
    }

    return res;
}

console.log(nextSmallerElement([4, 8, 5, 2, 25]));
console.log(nextSmallerElement([13, 7, 6, 12]));
