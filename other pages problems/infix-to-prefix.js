

function infixToPrefix(str) {

  const stack = [];
  const prefix = [];

  const priority = { '^': 3, '*': 2, '/': 2, '+': 1, '-': 1 };

  for (let i = str.length - 1; i >= 0; i--) {
    // console.log(i, str[i], stack, prefix);


    if (str[i] === ')') {
      stack.push(str[i]);
      continue;
    }

    if (str[i] === '(') {
      while (stack[stack.length - 1] !== ')') {
        prefix.push(stack.pop())
      }
      stack.pop();
      continue
    }

    if (priority[str[i]]) {

      if (stack.length === 0 || stack[stack.length - 1] === ')' || priority[str[i]] >= priority[stack[stack.length - 1]]) {
        stack.push(str[i])
      } else {
        while (priority[str[i]] < priority[stack[stack.length - 1]]) {
          prefix.push(stack.pop())
        }

        stack.push(str[i])
      }

    } else {
      prefix.push(str[i])
    }

  }

  while (stack.length !== 0) {
    prefix.push(stack.pop())
  }

  return prefix.reverse().join('')
}

console.log(infixToPrefix('a*b+c^d*e'));
// '+*ab*^cde'
console.log(infixToPrefix('(a-b/c)*(a/k-l)'));
console.log(infixToPrefix('(a-b/c)*((a/k-l)*a/k-l)'));


// ----------------------------------------------------------------------
// redo

function infixToPrefix2(str) {

  let priority = { '+': 1, '-': 1, '/': 2, '*': 3, '^': 4 };
  let stack = [];
  let prefix = [];

  for (let i = str.length - 1; i > -1; i--) {

    if (str[i] === ')') {
      stack.push(str[i]);
      continue;
    }

    if (str[i] === '(') {
      while (stack[stack.length - 1] != ')' && stack.length) {
        prefix.push(stack.pop());
      }
      stack.pop();
      continue;
    }

    // console.log(stack, str[i], i);
    if (str[i] in priority) {
      let top = stack[stack.length - 1];
      while (stack.length && stack[stack.length - 1] != ')' && priority[str[i]] < priority[top]) {
        prefix.push(stack.pop());
      }
      stack.push(str[i]);
    } else {
      prefix.push(str[i]);
    }

  }

  while (stack.length) {
    prefix.push(stack.pop());
  }

  return prefix.reverse().join('')
}

console.log('-'.repeat(70));
console.log(infixToPrefix2('a*b+c^d*e'));
console.log(infixToPrefix2('(a-b/c)*(a/k-l)'));
console.log(infixToPrefix('(a-b/c)*((a/k-l)*a/k-l)'));
