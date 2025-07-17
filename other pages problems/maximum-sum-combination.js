// https://www.geeksforgeeks.org/problems/maximum-sum-combination/1


class PriorityQueue {

  constructor(objectArr = []) {
    this.heap = [];
    this.buildPriorityQueue(objectArr);
  }

  // Bulk heapify (Floyd’s)
  // tc: O(n)
  // each heapifyDown takes O(logn) but the agregated work takes O(n)
  buildPriorityQueue(objectArr) {
    // this should validate that each element is a object
    this.heap = objectArr;

    const startIdx = Math.floor(this.heap.length / 2) - 1;
    for (let i = startIdx; i >= 0; i--) {
      this._heapifyDown(i);
    }
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

class Solution {
  topKSumPairs(a, b, k) {

    a.sort((a, b) => b - a);
    b.sort((a, b) => b - a);

    let i = 0, j = 0;
    let pairsMaxHeap = new PriorityQueue();
    pairsMaxHeap.insert([a[i] + b[j], i, j], a[i] + b[j]);

    let dup = new Set();
    let res = [];
    // js creates a new array when checking dup.has([i,j])
    // [i,j] is different array
    dup.add(`${[i, j]}`);

    while (res.length < k) {
      let [maxSum, i, j] = pairsMaxHeap.pop();

      // res.push([a[i], b[j]]);
      res.push(maxSum);

      // eventually some pairs will be popped, so an indices i or j will go back, and starting from there there could be duplicates. We need a set to check them

      if (i + 1 < a.length && !dup.has(`${[i + 1, j]}`)) {
        pairsMaxHeap.insert([a[i + 1] + b[j], i + 1, j], a[i + 1] + b[j]);
        dup.add(`${[i + 1, j]}`);
      }

      if (j + 1 < b.length && !dup.has(`${[i, j + 1]}`)) {
        pairsMaxHeap.insert([a[i] + b[j + 1], i, j + 1], a[i] + b[j + 1]);
        dup.add(`${[i, j + 1]}`);
      }

    }
    return res
  }

}

// tc: O(2*nlog(n) + klog)

let res = new Solution();
// console.log(res.topKSumPairs([3, 2], [1, 4], 2));
// console.log(res.topKSumPairs([1, 4, 2, 3], [2, 5, 1, 6], 3));
console.log(res.topKSumPairs([10, 9, 5, 3, 7], [6, 6, 3, 2, 2], 5));
