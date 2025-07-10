function postToInfix(str){

    const stack = [];
    let newExpre;

    let operators = new Set(['^','*','/','+','-'])

    for (let i = 0; i < str.length; i++) {

        // console.log(i, str[i], stack, newExpre);
        
        if(operators.has(str[i])){

            newExpre = stack.pop();
            newExpre = "(" + stack.pop() + str[i] + newExpre + ')';
            stack.push(newExpre);

        }else{
            stack.push(str[i]);
        }
    }

    return stack.pop();
}

console.log(postToInfix('ab*c+ '));