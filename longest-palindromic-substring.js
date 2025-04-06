/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s){

    let max = '';

    for (let i = 0; i < s.length; i++) {
        let res = checkAtIndex(s, i);
        // console.log(i, res, res.length);

        if(res.length >  max.length){
            max = res
        }
    }
    
    return max;
};

function checkAtIndex(s, index){

    let left = 1, right = 1, substr = s[index];

    while(s[index - left] && (s[index - left] === s[index] || s[index + right] === s[index])){
        if(s[index - left] === s[index]) {
            substr = s[index - left] + substr;
            left++;
        };

        if(s[index + right] === s[index]) {
            substr = substr + s[index + right];
            right++;
        };
    }
    while((index - left) >= 0){

        if(s[index - left] !== s[index + right]) return substr;

        substr = substr + s[index + right];
        substr = s[index - left] + substr;

        left++;
        right++;

        // console.log('substr', substr);

    }

    return substr;

}



console.log(longestPalindrome('abcbaoabcba'));

'222020221'

'abcdcba'
'abcdcdc'
'bananas'
'abcbaooooooo'
'abcbaoabcba'





// expand method, also sc: O(n^2)

var longestPalindrome2 = function(s){

    let max = '';

    function checkAtIndex2(left, right){

        while(left >= 0 && right < s.length && s[left] === s[right]){
            left--;
            right++;
        }
        console.log(left + 1, right, s.slice(left + 1, right));
        return s.slice(left + 1, right);
    }

    for (let i = 0; i < s.length; i++) {
        let odd = checkAtIndex2(i, i);
        let even = checkAtIndex2(i, i + 1);

        if(odd.length >  max.length){
            max = odd;
        }

        if(even.length >  max.length){
            max = even;
        }
    }
    
    return max;
};


console.log(longestPalindrome2('bb'));
