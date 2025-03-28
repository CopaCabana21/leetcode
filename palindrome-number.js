// https://leetcode.com/problems/palindrome-number/description/


/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {

    if(x < 0 || (x != 0 && x%10 == 0)) return false;
    
    let reversed = 0, temp = x;

    while(temp != 0){

        reversed = reversed*10 + temp % 10;
        temp = Math.floor(temp / 10);
        // console.log('reversed', reversed, "temp", temp);
    }

    return reversed == x;
};


// console.log(isPalindrome(4030300));