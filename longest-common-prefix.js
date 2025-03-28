var longestCommonPrefix = function(strs) {

    let prefix = '';
    
    for (let i = 0; i < strs[0].length; i++) {

        const allMatch = strs.every(ele => ele[i] === strs[0][i]);
        if(!allMatch) break;
        prefix += strs[0][i]
    }

    return prefix
};

console.log(JSON.stringify(longestCommonPrefix([""])));