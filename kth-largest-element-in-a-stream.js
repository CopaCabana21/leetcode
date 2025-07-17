/**
 * @param {number} k
 * @param {number[]} nums
 */
class mMinHeap {

  constructor(arr = []) {
    this.heap = [];
    this.buildHeap(arr);

  }

  // Bulk heapify (Floyd’s)	
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

var KthLargest = function (k, nums) {
  this.mh = new mMinHeap(nums);
  while (this.mh.length() > k) this.mh.pop();
  this.k = k;
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.mh.insert(val);
  if (this.mh.length() > this.k) this.mh.pop();
  return this.mh.peek();
};

var obj = new KthLargest(3, [4, 5, 8, 2])
var param_1 = obj.add(3);
console.log(obj.mh);
console.log(param_1);

