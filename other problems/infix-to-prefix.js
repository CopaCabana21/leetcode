

function infixToPrefix(str){

    const stack = [];
    const prefix = [];

    const priority = {'^':3, '*':2, '/':2, '+':1, '-':1};
    
    for(let i = str.length - 1; i >= 0; i--){
        console.log(i, str[i], stack, prefix);


        if(str[i] === ')'){
            stack.push(str[i]);
            continue;
        }

        if(str[i] === '('){
            while(stack[stack.length-1] !== ')'){
                prefix.push(stack.pop())
            }
            stack.pop();
            continue
        }

        if(priority[str[i]]){

            if(stack.length === 0 || stack[stack.length-1] === ')' || priority[str[i]] >= priority[stack[stack.length-1]] ){
                stack.push(str[i])
            }else{
                while(priority[str[i]] < priority[stack[stack.length-1]]){
                    prefix.push(stack.pop())
                }

                stack.push(str[i])
            }

        }else{
            prefix.push(str[i])
        }

    }

    while(stack.length !== 0){
        prefix.push(stack.pop())
    }

    return prefix.reverse().join('')
}

// console.log(infixToPrefix('a*b+c^d*e'));
// '+*ab*^cde'
console.log(infixToPrefix('(a-b/c)*(a/k-l)'));
// console.log(infixToPrefix('(a-b/c)*((a/k-l)*a/k-l)'));
