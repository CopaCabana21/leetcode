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




