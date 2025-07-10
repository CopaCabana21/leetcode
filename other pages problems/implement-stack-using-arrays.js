
// https://takeuforward.org/plus/dsa/problems/implement-stack-using-arrays

class ArrayStack {

  constructor() {
    this.arr = [];
  }

  push(x) {
    this.arr.push(x);
  }

  pop() {
    return this.arr.pop();
  }

  top() {
    return this.arr[this.arr.length - 1];
  }

  isEmpty() {
    return this.arr.length === 0;
  }
}

const stack = new ArrayStack();
console.log(stack);

stack.push(0);
stack.push(1);
stack.push(2);

console.log(stack.top());

console.log(stack);
console.log(stack.pop());
console.log(stack);

console.log(stack.pop());
console.log(stack.pop());
console.log(stack);
