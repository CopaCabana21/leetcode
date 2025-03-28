var removeDuplicates = function(nums) {
    
    let seen = {},_;
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        if(nums[i] in seen){
            nums[i] = _;
        }else{
            seen[nums[i]] = '1';
            count++;
        }
    }
    // console.log(nums);
    // console.log(seen);
    nums.sort((a,b) => a-b);

    return count
};


let nums = [-3,-1,0,0,0,3,3];
console.log(removeDuplicates(nums));
console.log(nums);


// ---------------------------------------------------------------


var removeDuplicates2 = function(nums) {
    
    let j = 1;

    for (let i = 1; i < nums.length; i++) {
        if(nums[i] != nums[i-1]){
            nums[j] = nums[i];
            j++
        }
    }

    return j;
};

console.log(removeDuplicates2(nums));
console.log(nums);