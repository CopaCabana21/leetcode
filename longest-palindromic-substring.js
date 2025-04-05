/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s){

    let max = [0,0];

    for (let i = 0; i < s.length; i++) {
        let res = checkAtIndex(s, i);
        // console.log(i, res, s.slice(res[0], res[1]+1));

        if(res[1] - res[0] + 1 > max[1] - max[0] + 1){
            max = res
        }
    }
    
    return s.slice(max[0], max[1]+1);
};

function checkAtIndex(s, index){

    let left = 1, right = 1, substr = '';


    while(s[index - left] && (s[index - left] === s[index] || s[index + right] === s[index])){
        if(s[index - left] === s[index]) {
            left++;
        };

        if(s[index + right] === s[index]) {
            right++;
        };
    }

    while((index - left) >= 0){

        if(s[index - left] !== s[index + right]) return [index - left + 1, index + right - 1];

        left++;
        right++;

    }

    return [0, index + right - 1];

}



console.log(longestPalindrome('bananas'));

'222020221'

'abcdcba'
'abcdcdc'
'bananas'
'abcbaooooooo'
'abcbaoabcba'




