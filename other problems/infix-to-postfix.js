
// https://takeuforward.org/data-structure/infix-to-postfix/

// https://www.geeksforgeeks.org/convert-infix-expression-to-postfix-expression/

function infixToPostfix(str){

    const stack = ['@'];
    let postfix = '';

    const priority = {'^':1, '*':2, '/':2, '+':4, '-':4, '@':6}

    for(let i = 0; i < str.length; i++){
        // console.log(i, postfix);
        // console.log(i, str[i], priority[str[i]], stack, postfix);

        if(str[i] === '('){
            stack.push('(');
            continue;
        }

        if(str[i] == ')'){
            // console.log(i, str[i], priority[str[i]], stack, postfix);

            while(stack[stack.length - 1] !== '('){
                postfix = postfix + stack[stack.length - 1];
                stack.pop();
            }
            
            stack.pop();
            continue;
        }

        if(priority[str[i]]){
            // check priority
            if(priority[str[i]] >= priority[stack[stack.length - 1]]){

                // console.log(i, str[i], priority[str[i]], stack, postfix);

                while(priority[str[i]] >= priority[stack[stack.length - 1]]){
                    postfix = postfix + stack[stack.length - 1];
                    stack.pop();
                }

                stack.push(str[i]);

            }else{

                stack.push(str[i])

            }

        }else{
            // append letters
            postfix = postfix + str[i]
        }

    }

    // add remainder symbols
    while(stack.length !== 1){
        postfix = postfix + stack.pop();
    }

    return postfix
}

// console.log(infixToPostfix("a*b+c^d/e^f"));
console.log(infixToPostfix("(p+q)*(m-n)"));
// console.log(infixToPostfix("a+b*(c^d-e)^(f+g*h)-i"));