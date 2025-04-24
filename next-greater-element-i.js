/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {

    const map = new Map();
    let res = [];

    // O(L1)
    nums2.forEach((ele, index) => {
        map.set(ele, index)
        
    });


    // the sums of total comparisons would be, in the worst case
    // where for example: l1 = [10,9,8,6]; l2 = [10,9,8,7,6,5,4]

    // S = (L2-1) + (L2-2) +  ... + (L2-L1) = (L1/2)*(2L2 - L1 -1)
    // S ~ L1*L2 - (L1^2)/2
    // since L1<=L2, the dominant term is L1*L2
    // S = O(L1*L2)

    for(const ele of nums1){
        let max = -1;
        let start = map.get(ele);

        for(let i = start + 1; i < nums2.length; i++){
            // console.log(ele, 'index', i, nums2[i]);

            if(nums2[i] > ele){
                max = nums2[i];
                break;
            }
        }

        res.push(max)
    }

    return res
    
};

// tc: O(n + n*m) -> O(n*m)
// sc: O(n + m)

// console.log(nextGreaterElement([4,1,2], [1,3,4,2]));



// -------------------------------------------------------------

// monotonic stack

var nextGreaterElement2 = function(nums1, nums2) {

    const stack = [];
    const map = new Map();

    // O(n)
    for (const ele of nums2) {
        // console.log([ele, stack, map]);

        // Eventhough there's a while, each element gets pushed and popped once, so 2 * O(1)
        while(stack.length !== 0 && stack[stack.length-1] < ele){
            map.set(stack.pop(), ele) // O(1)
        }

        stack.push(ele) // O(1)
    }

    return nums1.map(ele => {
        return map.has(ele)? map.get(ele) : -1
    })
};

// tc: O(n + m)
// sc: O(n)


console.log(nextGreaterElement2([4,1,2], [1,3,4,2]));
