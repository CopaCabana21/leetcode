// https://www.geeksforgeeks.org/prefix-postfix-conversion/?ref=next_article_top

function prefixToPostfix(str){

    const stack = [];
    let newExpre;

    let operators = new Set(['^','*','/','+','-'])

    for(let i = str.length - 1; i >= 0; i--){

        console.log(i, str[i], stack, newExpre);
        
        if(operators.has(str[i])){

            newExpre = stack.pop() + stack.pop() + str[i];
            stack.push(newExpre);

        }else{
            stack.push(str[i]);
        }
    }

    return stack[0]
}


console.log(prefixToPostfix('*-A/BC-/AKL'));