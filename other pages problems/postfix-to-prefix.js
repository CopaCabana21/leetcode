// https://www.geeksforgeeks.org/postfix-prefix-conversion/


function postfixToPrefix(str) {

  const stack = [];
  let newExpre;

  let operators = new Set(['^', '*', '/', '+', '-']);

  for (let i = 0; i < str.length; i++) {

    console.log(i, str[i], stack);

    if (operators.has(str[i])) {

      newExpre = stack.pop();
      newExpre = str[i] + stack.pop() + newExpre;
      stack.push(newExpre);

    } else {
      stack.push(str[i]);
    }

  }

  return stack.pop();

}

// console.log(postfixToPrefix('ABC/-AK/L-*'));


// -----------------------------------------------------------------
// redo

function postfixToPrefix2(str) {

  let operators = new Set(['^', '*', '/', '+', '-']);
  let stack = [];

  for (let i = 0; i < str.length; i++) {
    if(operators.has(str[i])){
      let top = stack.pop();
      let expr = str[i] + stack.pop() + top;
      stack.push(expr);
    }else{
      stack.push(str[i])
    }
  }

  return stack[0]
}

console.log(postfixToPrefix2('ABC/-AK/L-*'));
