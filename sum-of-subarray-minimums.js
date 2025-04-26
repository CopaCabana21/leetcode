/**
 * @param {number[]} arr
 * @return {number}
 */

// -----------------------------------------------------------------------------

// [3,1,2,5,4]

// 3 - [3] - 3
// 1 - [3,1] [1] - 1, 1
// 2 - [3,1,2] [1,2] [2] - 1, 1, 2
// 5 - [3,1,2,5] [1,2,5] [2,5] [5] - 1, 1, 2, 5
// 4 - [3,1,2,5,4] [1,2,5,4] [2,5,4] [5,4] [4] - 1, 1, 2, 4, 4


// arr[i] > arr[minIndex] ; res[i] = res[minIndex] + (i - minIndex) * arr[i]
// min: first left minimum than arr[i]

// stack contains indexes
// pop stack until the left min index is found, then use index value from the stack

// -----------------------------------------------------------------------------

var sumSubarrayMins = function(arr) {

    let stack = [0];
    let res = Array(arr.length).fill(0);
    res[0] = arr[0];
    let minIndex;


    for (let i = 1; i < arr.length; i++) {

        // console.log(i, arr[i], stack, res);
    
        while(arr[stack[stack.length - 1]] > arr[i]){
            stack.pop()
        }

        if(stack.length === 0){
            res[i] = (i+1)*arr[i]
        }else{
            minIndex = stack[stack.length - 1];
            res[i] = res[minIndex] + (i - minIndex)*arr[i]
        }



        stack.push(i);
    }


    let sum = 0;

    for (let i = 0; i < res.length; i++) {
        sum += res[i]
    }


    return sum % (10**9 + 7);

};

// tc: O(n)
// sc: O(n)

// console.log(sumSubarrayMins([3,1,2,4]));
// console.log(sumSubarrayMins([11,81,94,43,3]));


// -----------------------------------------------------------------------

// prepending 0 to arr


var sumSubarrayMins2 = function(arr) {

    arr.unshift(0); // O(n)

    let stack = [0];
    let res = Array(arr.length).fill(0);
    let minIndex;


    for (let i = 0; i < arr.length; i++) {

        // console.log(i, arr[i], stack, res);
    
        while(arr[stack[stack.length - 1]] > arr[i]){
            stack.pop()
        }

        minIndex = stack[stack.length - 1];
        res[i] = res[minIndex] + (i - minIndex)*arr[i]

        stack.push(i);
    }


    let sum = 0;

    for (let i = 0; i < res.length; i++) {
        sum += res[i]
    }


    return sum % (10**9 + 7);

};

// tc: O(n + n)
// sc: O(n)

// console.log(sumSubarrayMins([3,1,2,4]));
console.log(sumSubarrayMins2([11,81,94,43,3]));