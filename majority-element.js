/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    

    const track = new Map([]); // O(1)
    const floor = Math.floor(nums.length / 2); // O(1)

    for(const ele of nums) {

        if(!track.has(ele)){ // O(1)
            track.set(ele,1); // O(1)
        }else{
            track.set(ele, track.get(ele) + 1);
        }

        if(track.get(ele) > floor) return ele // O(1)
    }
};

// tc: O(n)
// sc: O(n)

console.log(majorityElement([2,2,1,1,1,2,2]));


// ----------------------------------------------------------
// Moore Voting Algorithm

var majorityElement2 = function(nums) {
    
    let candidate = 0;
    let count = 0;


    for (const ele of nums) {
        
        if(count === 0){
            candidate = ele;
        }

        if(ele === candidate){
            count++
        }else{
            count--
        }
    }

    return candidate;
};

// tc: O(n)
// sc: O(1)