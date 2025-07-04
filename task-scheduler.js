/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */

class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}


class mQueue {

  constructor() {
    this.first = null;
    this.last = null;
  }

  peek() {
    return this.first ? this.first.val : undefined;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.first === null) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
  }

  dequeue() {

    if (this.first === null) return undefined;

    const first = this.first;
    this.first = this.first.next;

    if (this.first === null) this.last = null;

    return first.val
  }
}

class MaxPQ {

  constructor() {
    this.heap = []
  }

  _left(i) {
    return 2 * i + 1
  }

  _right(i) {
    return 2 * i + 2
  }

  _parent(i) {
    return Math.floor((i - 1) / 2)
  }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  _heapifyUp(i) {
    while (i > 0 && this.heap[this._parent(i)].priority < this.heap[i].priority) {
      let p = this._parent(i);
      this._swap(p, i);
      i = p;
    }
  }

  _heapifyDown(i) {
    let heap = this.heap;

    while (true) {
      let left = this._left(i);
      let right = this._right(i);
      let highest = i;

      if (left < heap.length && heap[highest].priority < heap[left].priority) highest = left;
      if (right < heap.length && heap[highest].priority < heap[right].priority) highest = right;

      if (highest === i) break;
      this._swap(i, highest);
      i = highest;
    }
  }

  insert(value, priority) {
    this.heap.push({ value, priority });
    this._heapifyUp(this.heap.length - 1);
  }

  peek() {
    return this.heap[0].value;
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop().value;

    let top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);

    return top.value;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

}

var leastInterval = function (tasks, n) {

  let freqs = {}, res = [];
  for (const task of tasks) {
    freqs[task] = (freqs[task] || 0) + 1;
  }

  let maxPQ = new MaxPQ();

  for (const task in freqs) {
    maxPQ.insert([task, freqs[task]], freqs[task]);
  }

  let waitQueue = new mQueue();
  let interval = 0;

  while (maxPQ.size() || waitQueue.peek()) {
    console.log('-----------');
    console.log('interval: ', interval);
    console.log(res);
    console.log('waitQueue: ', JSON.stringify(waitQueue.first));

    let peek = waitQueue.peek();
    if (peek && peek[0] === interval) {
      let [_, [task, count]] = waitQueue.dequeue();
      maxPQ.insert([task, count], count);
    }
    console.log('waitQueue: ', JSON.stringify(waitQueue.first));
    console.log(maxPQ.heap);

    if (!maxPQ.isEmpty()) {
      let [task, count] = maxPQ.pop();
      res.push(task);
      if (count > 1) waitQueue.enqueue([interval + n + 1, [task, count - 1]])
    } else {
      res.push('idle');
    }

    interval++;
  }

  console.log(res);
  return interval;
};

// console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2));
// console.log(leastInterval(["A","C","A","B","D","B"], 1));
console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 3));


