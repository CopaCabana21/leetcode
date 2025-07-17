// https://takeuforward.org/plus/dsa/problems/minimum-cost-to-connect-sticks

class mMinHeap {

  constructor(arr = []) {
    this.heap = [];
    this.buildHeap(arr);

  }

  // Bulk heapify (Floyd’s)
  // tc: O(n)
  // each heapifyDown takes O(logn) but the agregated work takes O(n)
  buildHeap(arr) {
    this.heap = arr;
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

  _heapifyUp() {
    let heap = this.heap;
    let i = this.heap.length - 1;

    while (i > 0 && heap[this._parent(i)] > heap[i]) {
      let p = this._parent(i);
      [heap[p], heap[i]] = [heap[i], heap[p]]
      i = p;
    }
  }

  _heapifyDown(i) {
    let heap = this.heap;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < heap.length && heap[smallest] > heap[left]) smallest = left;
      if (right < heap.length && heap[smallest] > heap[right]) smallest = right;

      if (smallest === i) break;
      [heap[smallest], heap[i]] = [heap[i], heap[smallest]]
      i = smallest;
    }
  }

  insert(val) {
    this.heap.push(val);
    this._heapifyUp();
  }

  peek() {
    return this.heap[0];
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    let min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);

    return min;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  length() {
    return this.heap.length;
  }

}


class Solution {
  minCost(arr) {
    if (arr.length < 2) return 0;
    let heap = new mMinHeap(arr); // O(n) on all cases
    let sum = 0;
    while (true) {
      let partial = heap.pop() + heap.pop();
      sum += partial;
      if (heap.isEmpty()) break;
      heap.insert(partial);
    }
    return sum;
  }
}

const sol = new Solution();
// console.log(sol.minCost([4, 3, 2, 6]));
// console.log(sol.minCost([4, 2, 7, 6, 9]));
console.log(sol.minCost([10]));

// t