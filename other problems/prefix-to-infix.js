// https://www.geeksforgeeks.org/problems/prefix-to-infix-conversion/1?itm_source=geeksforgeeks&itm_medium=article&itm_campaign=practice_card


function prefixToInfix(str){

    const stack = [];
    let newExpre;

    let operators = new Set(['^','*','/','+','-'])

    for(let i = str.length - 1; i >= 0; i--){

        // console.log(i, str[i], stack, newExpre);
        
        if(operators.has(str[i])){

            newExpre = "(" + stack.pop() + str[i] + stack.pop() + ')';
            stack.push(newExpre);

        }else{
            stack.push(str[i]);
        }
    }

    return stack[0]
}

console.log(prefixToInfix('*-A/BC-/AKL'));