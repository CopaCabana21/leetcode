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


class queue {

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

class MaxPriorityQueue {

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
    return this.heap.length ? this.heap[0].value : undefined;
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


// T = total number of tasks
// U = number of **unique tasks** (max 26)
// n = cooldown


var leastInterval = function (tasks, n) {

  let freqs = {};
  // O(T)
  for (const task of tasks) {
    freqs[task] = (freqs[task] || 0) + 1;
  }

  let maxPQ = new MaxPriorityQueue();

  // O(U * log(U)) -> O(26 * log(26)) -> O(1)
  for (const task in freqs) {
    maxPQ.insert([task, freqs[task]], freqs[task]);
  }

  let waitQueue = new queue();
  let interval = 0;

  // based on the formula when n >= number of taks
  // time = (n+1)*(max_freq-1)+count_maxfreq_task

  // an upper bound exageration is: time ≤ T + ((n+1) * (maxFreq - 1))
  // where there's no task left to fill
  // so for each time there's log(U)

  // the big O for this part: O(time * log(U))
  // -> O((T + ((n+1) * (maxFreq - 1))) * log(U)) -> 
  // O((T * n * maxFreq) * log(U))

  // In the worst case: O((T * n * maxFreq) * log(U)) -> O((T + T) * log(U))
  // The final would be: O(T + 1 + (T + T) * log(U)) -> O(T * log U) -> O(T)

  while (maxPQ.size() || waitQueue.peek()) {
    // console.log('-----------');
    // console.log('interval: ', interval);
    // console.log(res);
    // console.log('waitQueue: ', JSON.stringify(waitQueue.first));

    let peek = waitQueue.peek();
    if (peek && peek[0] === interval) {
      let [_, [task, count]] = waitQueue.dequeue();
      maxPQ.insert([task, count], count);
    }

    if (!maxPQ.isEmpty()) {
      let [task, count] = maxPQ.pop();
      if (count > 1) waitQueue.enqueue([interval + n + 1, [task, count - 1]])
    }

    interval++;
  }

  return interval;
};

// console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2));
// console.log(leastInterval(["A","C","A","B","D","B"], 1));
// console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 3));
// console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 0));


// --------------------------------------------------------
// formula based solution


// T = total number of tasks
// U = number of **unique tasks** (max 26)
// n = cooldown

// if n < T : time = length tasks
// if n >= T : time = (n+1)*(max_freq-1)+count_maxfreq_task

// max_freq : task with the max frequency
// count_maxfreq_task : number of taks that have the max frequency


// ---------------------------------------------------------------------
// redo

var leastInterval2 = function (tasks, n) {

  const freqs = {};
  for (const task of tasks) {
    freqs[task] = (freqs[task] || 0) + 1;
  }

  const availableTasks = new MaxPriorityQueue();
  // [task, freqLeft]
  // if available use the task with more frequency
  for (const task in freqs) {
    availableTasks.insert([[task, freqs[task]], freqs[task]]);
  }

  // this is not a counter, is the index of each interval
  let interval = 0;
  // this will store in which interval index the task should be available
  // [intervalID, [task, freqLeft]]
  let cooldown = new queue();

  while (!availableTasks.isEmpty() || cooldown.peek()) {
    let cooled = cooldown.peek();

    // check if there's a new cooled down task
    // i.e. is the current interval matches the planned cooldown
    if (cooled && cooled[0] === interval) {
      // if it is then add to the available tasks
      let [_, [task, freq]] = cooldown.dequeue();
      availableTasks.insert([task, freq], freq);
    }

    // check available tasks and use the one with most frequency
    if (!availableTasks.isEmpty()) {
      // use it by popping it
      let [task, freq] = availableTasks.pop();
      // add to cooldown with a reduced frequency
      if (freq > 1) cooldown.enqueue([interval + n + 1, [task, freq - 1]]);
    }

    // a used task or iddle will advance the interval index
    interval++;
  }

  return interval;
}

console.log(leastInterval2(["A", "A", "A", "B", "B", "B"], 3));
// console.log(leastInterval2(["A", "A", "A", "B", "B", "B"], 0));