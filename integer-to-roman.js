/**
 * @param {number} num
 * @return {string}
 */


var intToRoman = function(num) {

    const nums = [1,4,5,9,10,40,50,90,100,400,500,900,1000];
    
    const rls = {
        1: 'I',
        5: 'V',
        10: 'X',
        50: 'L',
        100: 'C',
        500: 'D',
        1000: 'M',
        4: 'IV',
        9: 'IX',
        40: 'XL',
        90: 'XC',
        400: 'CD',
        900: 'CM'
    }

    let max = 0, res = '', numRest = num;

    // O(1)
    // because the largest roman number is 3999 and the number of operations do not scale with input size
    // because the input number is bounded and for practical purposes it is O(1)
    while(numRest > 0){ 
        max = maximumSubtract(numRest, nums);
        res = res + rls[max];
        numRest = numRest - max;
    }

    return res
};

function maximumSubtract(num, nums){

    let res = 0;
    
    for (let i = 0; i < nums.length; i++) { // O(1) constant the array is fixed
        if(num - nums[i] === 0) return nums[i];
        if(num - nums[i] < 0) return res;
        if(i === nums.length - 1) return nums[i];
        res = nums[i];
    }

    return -1;
}


// console.log(maximumSubtract(9, [1,4,5,9,10,40,50,90,100,400,500,900,1000]));
console.log(intToRoman(1994));

// tc: O(1)
// sc: O(1)
// again the it is constant because the arrays and object do not scale with input


