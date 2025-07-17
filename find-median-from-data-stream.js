


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


var MedianFinder = function () {
  this.left = new mMinHeap();
  this.right = new mMinHeap();
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {

  // each addition requires to push and pop to the other list because num can land in any list but the left should always be floor(n/2)
  // with k=floor(n/2)
  // if n is even (k,k), then add to left first and pop, to have (k,k+1) at the end
  // if n is odd (k,k+1), then add to right  and pop to have (K+1,k+1)

  // this way the order is maintained in the total list of left and right

  // left is a max heap
  // right is a min heap

  if (this.left.size() === this.right.size()) {
    this.left.insert(-num)
    this.right.insert(-this.left.pop());
  } else {
    this.right.insert(num)
    this.left.insert(-this.right.pop());
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {

  if (this.left.size() === this.right.size()) {
    return (-this.left.peek() + this.right.peek()) / 2;
  } else {
    return this.right.peek();
  }

};

var obj = new MedianFinder()
obj.addNum(1);
obj.addNum(2);
console.log(obj);
console.log(obj.findMedian());

// tc:
// with k=n/2
// each addition requires 2 inserts and 1 pop : 3*O(log(k)) -> O(log(n))
// find median: O(1)
// sc: 
// 2 heaps of length k : 2*O(n) -> O(n)
