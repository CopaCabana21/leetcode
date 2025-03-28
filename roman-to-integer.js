/**
 * @param {string} s
 * @return {number}
 */



var romanToInt = function(s) {

    const map = {'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000};
    let sum = 0;
    for(const [index, char] of Array.from(s).entries()){
        // console.log(index, char, s[index+1], ['D','M'].includes(s[index+1]));

        if(char == 'I' && ['V','X'].includes(s[index+1])) {sum -= map[char]; continue;};
        if(char == 'X' && ['L','C'].includes(s[index+1])) {sum -= map[char]; continue;};
        if(char == 'C' && ['D','M'].includes(s[index+1])) {sum -= map[char]; continue;};

        sum += map[char];
    }

    return sum;
};

console.log(romanToInt("MCMXCIV"));


// --------------------------------------------------------------------------

var romanToInt2 = function(s) {
    
    let rls = {'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000};
    let num = 0;

    for (let i = 0; i < s.length; i++) {
        // console.log(rls[s[i]]);
        if(rls[s[i]] < rls[s[i+1]]){
            num -= rls[s[i]]; 
        }else{
            num += rls[s[i]];
        };

    }
    return num;
};


console.log(romanToInt2("MCMXCIV"));
