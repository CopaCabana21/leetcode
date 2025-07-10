
// https://takeuforward.org/data-structure/infix-to-postfix/

// https://www.geeksforgeeks.org/convert-infix-expression-to-postfix-expression/

function infixToPostfix(str) {

  const stack = [];
  let postfix = '';

  const priority = { '^': 3, '*': 2, '/': 2, '+': 1, '-': 1 }

  for (let i = 0; i < str.length; i++) {
    // console.log(i, str[i], priority[str[i]], stack, postfix);


    if (str[i] === '(') {
      stack.push('(');
      continue;
    }

    if (str[i] == ')') {
      // console.log(i, str[i], priority[str[i]], stack, postfix);
      while (stack[stack.length - 1] !== '(') {
        postfix = postfix + stack.pop();
        // stack.pop();
      }

      stack.pop();
      continue;
    }

    if (priority[str[i]]) {
      // check priority
      if (stack.length === 0 || priority[str[i]] > priority[stack[stack.length - 1]] || stack[stack.length - 1] === '(') {

        stack.push(str[i])

      } else {

        while (priority[str[i]] <= priority[stack[stack.length - 1]]) {
          postfix = postfix + stack.pop();
        }

        stack.push(str[i]);
      }

    } else {
      // append letters
      postfix = postfix + str[i]
    }

  }

  // add remaining symbols
  while (stack.length) {
    postfix = postfix + stack.pop();
  }

  return postfix
}

console.log(infixToPostfix("a*b+c^d/e^f"));
console.log(infixToPostfix("(p+q)*(m-n)"));
console.log(infixToPostfix("a+b*(c^d-e)^(f+g*h)-i"));

// ----------------------------------------------------------------
// redo
console.log('-'.repeat(70));

function infixToPostfix2(str) {

  let operators = [];
  let postfix = [];

  let priority = { '(': 0, ')': 0, '^': 1, '*': 2, '/': 3, '+': 4, '-': 4 };

  for (let i = 0; i < str.length; i++) {

    if (str[i] === '(') {
      operators.push(str[i]);
      continue;
    }

    if (str[i] === ')') {
      while (operators[operators.length - 1] !== '(') {
        postfix.push(operators.pop())
      }
      operators.pop()
      continue;
    }

    if (str[i] in priority) {
      while (stack.length && operators[operators.length - 1] !== '(' && priority[str[i]] >= priority[operators[operators.length - 1]]) {
        postfix.push(operators.pop());
      }
      operators.push(str[i])
    } else {
      postfix.push(str[i]);
    }

  }
  // console.log(postfix);
  // console.log(operators);
  while (operators.length) {
    postfix.push(operators.pop())
  }

  return postfix.join('');
}

// console.log(infixToPostfix2("a*b+c^d/e^f"));
// console.log(infixToPostfix2("(p+q)*(m-n)"));
console.log(infixToPostfix2("a+b*(c^d-e)^(f+g*h)-i"));

// "a-b*c^d" -> "abcd^*-"
// "a*b+c^d" -> "ab*cd^+"