/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
    
    const stack = [];
    const map = new Map();
    const map2 = new Map();

    for (let i = 0; i < nums.length; i++) {

        // console.log(i, nums[i], stack, map);

        while(stack.length !== 0 && stack[stack.length-1] < nums[i]){
            map.set(stack.pop(), nums[i])
        }

        stack.push(nums[i])
    }

    for (let i = 0; i < nums.length; i++) {

        // console.log(i, nums[i], stack, map2);

        while(stack.length !== 0 && stack[stack.length-1] < nums[i]){
            map2.set(stack.pop(), nums[i])
        }
    }

    console.log(stack, map, map2);

    return nums.map(ele => {
        let num;

        if(map.has(ele)){
            num = map.get(ele);
            map.delete(ele);
        }else if(map2.has(ele)){
            num = map2.get(ele);
            map2.delete(ele);
        }else{
            num = -1;
        }

        // console.log(ele, num, map, map2);

        return num;

    });
    
}


console.log(nextGreaterElements([1,2,3,4,5,6,5,4,5,1,2,3]));