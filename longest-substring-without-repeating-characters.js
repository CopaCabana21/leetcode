

// https://leetcode.com/problems/longest-substring-without-repeating-characters/submissions/1579526226/

/**
 * @param {string} s
 * @return {number}
 */

var lengthOfLongestSubstring = function(s) {

    let left = 0;
    let charSet = new Set([]);
    let max = 0;

    for(let right=0; right<s.length; right++){
        // console.log(charSet);

        // remove the tail up to the duplicate
        // charSet has unique items, so use by value
        while(charSet.has(s[right])){
            charSet.delete(s[left]);
            left += 1;
        }

        // add char if it is new
        charSet.add(s[right]);

        if( right-left+1 > max ){
            max = right-left+1
        }
        // console.log(left, right);
        // console.log(charSet);
    }

    return max
};


const s = "abcabcbb";
console.log(lengthOfLongestSubstring(s));