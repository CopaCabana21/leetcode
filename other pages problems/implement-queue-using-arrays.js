
// https://takeuforward.org/plus/dsa/problems/implement-queue-using-arrays

class ArrayQueue {

  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
  }

  push(x) {
    this.arr[this.tail++] = x;
  }

  pop() {
    if (this.arr.length == 0) return undefined;

    let pop = this.arr[this.head];
    this.head++;

    // clean up
    if (this.head > this.arr.length / 2) {
      this.arr = this.arr.slice(this.head);
      this.tail = this.arr.length;
      this.head = 0;
    }

    return pop;
  }

  peek() {
    return this.arr[this.head]
  }

  isEmpty() {
    return this.head === this.tail;
  }
}


const arr = new ArrayQueue();

[...Array(10).keys()].forEach(e => arr.push(e))

console.log(arr);

[...Array(6).keys()].forEach(e => arr.pop())

console.log(arr);
