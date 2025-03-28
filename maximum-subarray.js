
// https://leetcode.com/problems/maximum-subarray

// my attempt

var maxSubArray = function(nums) {
    
    let sumCurrent = 0, sumGlobal = nums[0];

    for (let i = 0; i < nums.length; i++) {
        
        if(sumCurrent + nums[i] <= 0){
            if(sumCurrent + nums[i] > sumGlobal){
                sumGlobal = sumCurrent + nums[i];
            }
            
            sumCurrent = 0;

        }else{
            sumCurrent += nums[i];
            if(sumCurrent > sumGlobal){
                sumGlobal = sumCurrent;
            }
        }

    }

    return sumGlobal;
};


// console.log(maxSubArray([-2,-3]));
// console.log(maxSubArray([-2,-1]));
// console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
// console.log(maxSubArray([5,4,-1,7,8]));


// -----------------------------------------------------------------------------

// my attempt; shorter code



var maxSubArray2 = function(nums) {
    
    let sumCurrent = 0, sumGlobal = nums[0];

    for (let i = 0; i < nums.length; i++) {

        sumCurrent += nums[i];

        if(sumCurrent > sumGlobal){
            sumGlobal = sumCurrent;
        }

        if(sumCurrent <= 0){
            sumCurrent = 0;
        }

    }

    return sumGlobal;
};

// time comple: O(n)
// space comple: O(2)

// console.log(maxSubArray2([-2,-3]));
// console.log(maxSubArray2([-2,-1]));
// console.log(maxSubArray2([-2,1,-3,4,-1,2,1,-5,4]));
// console.log(maxSubArray2([5,4,-1,7,8]));


// ------------------------------------------------------------------------

// using math

var maxSubArray2 = function(nums) {
    
    let sumCurrent = 0, sumGlobal = nums[0];

    for (let i = 0; i < nums.length; i++) {

        sumCurrent += nums[i];

        sumGlobal = Math.max(sumGlobal, sumCurrent);

        sumCurrent = Math.max(sumCurrent, 0);
    }

    return sumGlobal;
};

// ------------------------------------------------------------------------

// kadane's algorithmn

var maxSubArray3 = function(nums) {
    
    let sumCurrent = sumGlobal = nums[0];

    for (let i = 1; i < nums.length; i++) {
        
        sumCurrent = Math.max(nums[i], sumCurrent + nums[i]);

        if(sumCurrent > sumGlobal){
            sumGlobal = sumCurrent;
        }

    }

    return sumGlobal;
};


console.log(maxSubArray3([-2,-3]));
console.log(maxSubArray3([-2,-1]));
console.log(maxSubArray3([-2,1,-3,4,-1,2,1,-5,4]));
console.log(maxSubArray3([5,4,-1,7,8]));
